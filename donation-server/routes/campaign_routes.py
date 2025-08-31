from flask import Blueprint, request, jsonify
from controllers.campaign_controller import CampaignController

campaign_bp = Blueprint("campaign_bp", __name__)

def init_campaign_routes(app, db):
    controller = CampaignController(db)

    @campaign_bp.route('/create_campaign', methods=['POST'])
    def create_campaign():
        return jsonify(controller.create_campaign(request.json))

    @campaign_bp.route('/get_campaigns', methods=['GET'])
    def get_campaigns():
        return jsonify(controller.get_campaigns())

    @campaign_bp.route('/edit_campaign/<id>', methods=['PUT'])
    def edit_campaign(id):
        return jsonify(controller.edit_campaign(id, request.json))

    @campaign_bp.route('/delete_campaign/<id>', methods=['DELETE'])
    def delete_campaign(id):
        return jsonify(controller.delete_campaign(id))

    @campaign_bp.route('/get_campaign/<id>', methods=['GET'])
    def get_campaign(id):
        return jsonify(controller.get_campaign(id))

    app.register_blueprint(campaign_bp)

