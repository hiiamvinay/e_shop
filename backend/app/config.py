from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    # MySQL Configurations
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_USER = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_DB = os.getenv('MYSQL_DB')

    # Mail Configurations
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('GMAIL_ID')
    MAIL_PASSWORD = os.getenv('GMAIL_APP_PASSWORD')

