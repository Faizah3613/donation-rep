# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient
# from bson import ObjectId
# import datetime

# app = Flask(__name__)
# CORS(app)

# client = MongoClient("mongodb+srv://Arman123:CwATyLPn8tm3OA2D@cluster0.dbm2bbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
# db = client["donation_db"]
# donations_collection = db["donations"]
# campaigns_collection = db["campaigns"]

# def convert_objectid(data):
#     for item in data:
#         item["_id"] = str(item["_id"])
#     return data

# # ------------------ CAMPAIGN ROUTES ------------------

# @app.route('/create_campaign', methods=['POST'])
# def create_campaign():
#     data = request.json
#     data["raised"] = 0
#     data["donors"] = 0
#     data["createdAt"] = datetime.datetime.utcnow().isoformat()
#     campaigns_collection.insert_one(data)
#     return jsonify({"message": "Campaign created successfully"})



# @app.route('/get_campaigns', methods=['GET'])
# def get_campaigns():
#     campaigns = list(campaigns_collection.find())
#     return jsonify(convert_objectid(campaigns))

# @app.route('/edit_campaign/<id>', methods=['PUT'])
# def edit_campaign(id):
#     data = request.json
#     campaigns_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
#     return jsonify({"message": "Campaign updated"})

# @app.route('/delete_campaign/<id>', methods=['DELETE'])
# def delete_campaign(id):
#     campaigns_collection.delete_one({"_id": ObjectId(id)})
#     return jsonify({"message": "Campaign deleted"})


# # ------------------ DONATION ROUTES ------------------

# @app.route('/get_donations', methods=['GET'])
# def get_donations():
#     donations = list(donations_collection.find())
#     return jsonify(convert_objectid(donations))

# @app.route('/delete_donation/<id>', methods=['DELETE'])
# def delete_donation(id):
#     result = donations_collection.delete_one({"_id": ObjectId(id)})
#     if result.deleted_count:
#         return jsonify({"message": "Donation deleted"})
#     else:
#         return jsonify({"error": "Donation not found"}), 404

# @app.route('/edit_donation/<donation_id>', methods=['PUT'])
# def edit_donation(donation_id):
#     data = request.get_json()
#     updated_fields = {
#         'email': data.get('email'),
#         'amount': data.get('amount'),
#         'campaign': data.get('campaign'),
#         'date': data.get('date')
#     }

#     result = donations_collection.update_one(
#         {'_id': ObjectId(donation_id)},
#         {'$set': updated_fields}
#     )

#     if result.modified_count == 1:
#         return jsonify({'message': 'Donation updated successfully'}), 200
#     else:
#         return jsonify({'error': 'No update performed'}), 400


# # ------------------ SINGLE CAMPAIGN FETCH ------------------

# @app.route('/get_campaign/<id>', methods=['GET'])
# def get_campaign(id):
#     campaign = campaigns_collection.find_one({"_id": ObjectId(id)})
#     if campaign:
#         campaign["_id"] = str(campaign["_id"])
#         return jsonify(campaign)
#     else:
#         return jsonify({"error": "Campaign not found"}), 404


# # ------------------ ADD DONATION ------------------

# @app.route("/add_donation", methods=["POST"])
# def add_donation():
#     data = request.json

#     required_fields = ["name", "amount", "email", "date", "campaignId", "campaignTitle"]
#     if not all(field in data for field in required_fields):
#         return jsonify({"error": "Missing required donation fields"}), 400

#     data["name"] = data["name"].strip()
#     data["email"] = data["email"].strip()

#     try:
#         data["amount"] = float(data["amount"])
#         if data["amount"] <= 0:
#             raise ValueError
#     except Exception:
#         return jsonify({"error": "Invalid donation amount"}), 400

#     result = donations_collection.insert_one(data)

#     campaigns_collection.update_one(
#         {"_id": ObjectId(data["campaignId"])},
#         {"$inc": {"raised": data["amount"], "donors": 1}}
#     )

#     return jsonify({"message": "Donation added", "donation_id": str(result.inserted_id)}), 201


# # ------------------ START SERVER ------------------

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=8000, debug=True)


from config import create_app
from routes.campaign_routes import init_campaign_routes
from routes.donation_routes import init_donation_routes

app = create_app()

# Initialize routes with db
init_campaign_routes(app, app.db)
init_donation_routes(app, app.db)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
