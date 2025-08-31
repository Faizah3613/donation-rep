from flask import Blueprint, request, jsonify
from controllers.donation_controller import DonationController

donation_bp = Blueprint("donation_bp", __name__)

def init_donation_routes(app, db):
    controller = DonationController(db)

    @donation_bp.route('/get_donations', methods=['GET'])
    def get_donations():
        return jsonify(controller.get_donations())

    @donation_bp.route('/delete_donation/<id>', methods=['DELETE'])
    def delete_donation(id):
        return jsonify(controller.delete_donation(id))

    @donation_bp.route('/edit_donation/<donation_id>', methods=['PUT'])
    def edit_donation(donation_id):
        return jsonify(controller.edit_donation(donation_id, request.json))

    @donation_bp.route('/add_donation', methods=['POST'])
    def add_donation():
        return jsonify(controller.add_donation(request.json))

    app.register_blueprint(donation_bp)
