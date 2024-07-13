import os

class Config:
    API_KEY = os.getenv('MTA_API_KEY', 'default_key')
