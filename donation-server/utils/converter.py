def convert_objectid(data):
    for item in data:
        item["_id"] = str(item["_id"])
    return data

