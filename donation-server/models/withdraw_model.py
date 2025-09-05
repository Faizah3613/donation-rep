from bson import ObjectId

class WithdrawModel:
    def __init__(self, db):
        self.collection = db["withdraw_requests"]

    def insert(self, data):
        result = self.collection.insert_one(data)
        return result.inserted_id

    def get_all(self):
        return list(self.collection.find())

    def get(self, withdraw_id):
        return self.collection.find_one({"_id": ObjectId(withdraw_id)})

    def delete(self, withdraw_id):
        return self.collection.delete_one({"_id": ObjectId(withdraw_id)})
