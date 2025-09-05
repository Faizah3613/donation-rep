from utils.converter import convert_objectid
from models.donation_model import DonationModel
from models.campaign_model import CampaignModel
from bson import ObjectId

class DonationController:
    def __init__(self, db):
        self.model = DonationModel(db)
        self.campaign_model = CampaignModel(db)

    def get_donations(self):
        donations = self.model.get_all()
        return convert_objectid(donations)

    def delete_donation(self, donation_id):
        result = self.model.delete(donation_id)
        if result.deleted_count:
            return {"message": "Donation deleted"}
        return {"error": "Donation not found"}, 404

    def edit_donation(self, donation_id, data):
        updated_fields = {
            'email': data.get('email'),
            'amount': data.get('amount'),
            'campaign': data.get('campaign'),
            'date': data.get('date'),
            'name': data.get('name'),
            'account_number': data.get('account_number'),
            'transaction_id': data.get('transaction_id'),
        }

        # Remove None values (so only provided fields get updated)
        updated_fields = {k: v for k, v in updated_fields.items() if v is not None}

        result = self.model.update(donation_id, updated_fields)
        if result.modified_count == 1:
            return {"message": "Donation updated successfully"}
        return {"error": "No update performed"}, 400

    def add_donation(self, data):
        required_fields = ["name", "amount", "email", "date", "campaignId", "campaignTitle"]
        if not all(field in data for field in required_fields):
            return {"error": "Missing required donation fields"}, 400

        data["name"] = data["name"].strip()
        data["email"] = data["email"].strip()

        try:
            data["amount"] = float(data["amount"])
            if data["amount"] <= 0:
                raise ValueError
        except Exception:
            return {"error": "Invalid donation amount"}, 400

        result = self.model.add(data)

        self.campaign_model.update(
            data["campaignId"],
            {"$inc": {"raised": data["amount"], "donors": 1}}
        )

        return {"message": "Donation added", "donation_id": str(result.inserted_id)}, 201

