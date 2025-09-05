from flask import Blueprint, request, jsonify, current_app
from controllers.withdraw_controller import WithdrawController

def init_withdraw_routes(app, db):
    controller = WithdrawController(db)
    bp = Blueprint("withdraw_bp", __name__)

    @bp.route("/withdraw_request", methods=["POST"])
    def create_withdraw_request():
        data = request.get_json()
        resp, status = controller.create_withdraw_request(data)
        return jsonify(resp), status

    @bp.route("/withdraw_requests", methods=["GET"])
    def list_withdraw_requests():
        resp, status = controller.list_withdraw_requests()
        return jsonify(resp), status

    @bp.route("/withdraw_request/<withdraw_id>/cancel", methods=["POST"])
    def cancel_withdraw(withdraw_id):
        resp, status = controller.cancel_withdraw(withdraw_id)
        return jsonify(resp), status

    @bp.route("/withdraw_request/<withdraw_id>/release", methods=["POST"])
    def release_withdraw(withdraw_id):
        resp, status = controller.release_withdraw(withdraw_id)
        return jsonify(resp), status

    app.register_blueprint(bp)
