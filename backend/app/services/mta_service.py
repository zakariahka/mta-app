from nyct_gtfs import NYCTFeed

API_KEY = "RU0gVzXH042AHIbqHF0jr8OBFYr3QCM99mfQRm7U"

def get_train_status(line_id):
    feed = NYCTFeed(line_id, api_key=API_KEY)
    trains = feed.trips
    train_status = []

    for train in trains:
        train_info = {
            "route_id": train.route_id,
            "location": train.location,
            "status": train.location_status,
            "last_update": train.last_position_update.isoformat()
        }
        train_status.append(train_info)
    
    return train_status
