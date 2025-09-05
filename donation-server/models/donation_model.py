from bson import ObjectId

class DonationModel:
    def __init__(self, db):
        self.collection = db["donations"]

    def get_all(self):
        return list(self.collection.find())

    def add(self, data):
        return self.collection.insert_one(data)

    def update(self, donation_id, fields):
        return self.collection.update_one(
            {"_id": ObjectId(donation_id)},
            {"$set": fields}
        )

    def delete(self, donation_id):
        return self.collection.delete_one({"_id": ObjectId(donation_id)})
    
    def find_by_all(self, email, transaction_id, account_number, amount):
        return self.collection.find_one({
            "email": email,
            "transaction_id": transaction_id,
            "account_number": account_number,
            "amount": amount
        })

    def delete_by_all(self, email, transaction_id, account_number, amount):
        return self.collection.delete_one({
            "email": email,
            "transaction_id": transaction_id,
            "account_number": account_number,
            "amount": amount
        })

