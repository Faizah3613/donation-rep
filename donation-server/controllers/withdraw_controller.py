from datetime import datetime
from models.withdraw_model import WithdrawModel
from models.donation_model import DonationModel
from bson import ObjectId

class WithdrawController:
    def __init__(self, db):
        self.withdraw_model = WithdrawModel(db)
        self.donation_model = DonationModel(db)

    def create_withdraw_request(self, data):
        if not data:
            return {"error": "No JSON body provided"}, 400

        required = ["name", "email", "account_number", "amount", "transaction_id"]
        missing = [f for f in required if not data.get(f)]
        if missing:
            return {"error": f"Missing required fields: {', '.join(missing)}"}, 400

        try:
            amount = float(data["amount"])
            if amount <= 0:
                raise ValueError
        except Exception:
            return {"error": "Invalid amount"}, 400

        # Verify donation exists in donations collection
        donation = self.donation_model.find_by_all(
            data["email"],
            data["transaction_id"],
            data["account_number"],
            amount
        )
        if not donation:
            return {"error": "No matching donation found"}, 404

        withdraw_doc = {
            "name": data["name"].strip(),
            "email": data["email"].strip(),
            "account_number": data["account_number"].strip(),
            "amount": amount,
            "transaction_id": data["transaction_id"].strip(),
            "status": "pending",
            "requested_at": datetime.utcnow()
        }

        inserted_id = self.withdraw_model.insert(withdraw_doc)
        return {"message": "Withdrawal request submitted", "id": str(inserted_id)}, 201

    def list_withdraw_requests(self):
        reqs = self.withdraw_model.get_all()
        # convert ObjectId to string for JSON
        for r in reqs:
            r["_id"] = str(r["_id"])
        return reqs, 200

    def cancel_withdraw(self, withdraw_id):
        res = self.withdraw_model.delete(withdraw_id)
        if res.deleted_count == 0:
            return {"error": "Withdrawal request not found"}, 404
        return {"message": "Withdrawal request canceled"}, 200

    def release_withdraw(self, withdraw_id):
        withdraw = self.withdraw_model.get(withdraw_id)
        if not withdraw:
            return {"error": "Withdrawal request not found"}, 404

        # delete donation that matches the same keys
        self.donation_model.delete_by_all(
            withdraw["email"],
            withdraw["transaction_id"],
            withdraw["account_number"],
            withdraw["amount"]
        )

        # remove the withdrawal request
        self.withdraw_model.delete(withdraw_id)

        return {"message": "Withdrawal released (donation + request deleted)"}, 200
