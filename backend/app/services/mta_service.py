# app/services/mta_service.py
from nyct_gtfs import NYCTFeed
from config import Config

VALID_LINE_IDS = [
    '1', '2', '3', '4', '5', '6', '7', 'S', 'GS', 'A', 'C', 'E', 'H', 'FS', 'SF', 'SR', 
    'B', 'D', 'F', 'M', 'G', 'J', 'Z', 'N', 'Q', 'R', 'W', 'L', 'SI', 'SS', 'SIR'
]

def get_train_status(line_id):
    if line_id not in VALID_LINE_IDS:
        raise ValueError(f"Invalid line_id: {line_id}. Must be one of: {VALID_LINE_IDS}")

    feed = NYCTFeed(line_id, api_key=Config.API_KEY)
    trains = feed.trips
    train_status = []

    for train in trains:
        last_update = train.last_position_update.isoformat() if train.last_position_update else "N/A"
        train_info = {
            "route_id": train.route_id,
            "location": train.location or "Unknown",
            "status": train.location_status or "Unknown",
            "last_update": last_update
        }
        train_status.append(train_info)
    
    return train_status
