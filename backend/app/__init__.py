from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from .routes.train_status import train_status_bp
    app.register_blueprint(train_status_bp, url_prefix='/status')

    return app
