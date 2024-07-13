# app/services/mta_service.py
from nyct_gtfs import NYCTFeed
from config import Config

def get_train_status(line_id):
    feed = NYCTFeed(line_id, api_key=Config.API_KEY)
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
