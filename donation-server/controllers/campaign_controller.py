import datetime
from utils.converter import convert_objectid
from models.campaign_model import CampaignModel

class CampaignController:
    def __init__(self, db):
        self.model = CampaignModel(db)

    def create_campaign(self, data):
        data["raised"] = 0
        data["donors"] = 0
        data["createdAt"] = datetime.datetime.utcnow().isoformat()
        self.model.create(data)
        return {"message": "Campaign created successfully"}

    def get_campaigns(self):
        campaigns = self.model.get_all()
        return convert_objectid(campaigns)

    def edit_campaign(self, id, data):
        self.model.update(id, data)
        return {"message": "Campaign updated"}

    def delete_campaign(self, id):
        self.model.delete(id)
        return {"message": "Campaign deleted"}

    def get_campaign(self, id):
        campaign = self.model.get_by_id(id)
        if campaign:
            campaign["_id"] = str(campaign["_id"])
            return campaign
        return {"error": "Campaign not found"}

