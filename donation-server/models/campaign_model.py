from bson import ObjectId

class CampaignModel:
    def __init__(self, db):
        self.collection = db["campaigns"]

    def create(self, data):
        return self.collection.insert_one(data)

    def get_all(self):
        return list(self.collection.find())

    def get_by_id(self, id):
        return self.collection.find_one({"_id": ObjectId(id)})

    def update(self, id, data):
        return self.collection.update_one({"_id": ObjectId(id)}, {"$set": data})

    def delete(self, id):
        return self.collection.delete_one({"_id": ObjectId(id)})
