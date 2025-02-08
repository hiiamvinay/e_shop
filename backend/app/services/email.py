from flask_mail import Mail, Message, current_app
import random


mail = Mail()

def init_mail(app):
    """Initialize Flask-Mail with the app's config."""
    mail.init_app(app)
    return mail



def send_email(app, to, subject, body):
    """Send an email."""
    try:
        msg = Message(subject, sender=app.config['MAIL_USERNAME'], recipients=[to])
        msg.body = body
        mail.send(msg)
    except:
        print("Error in sending email:", Exception)
        raise


def generate_otp():
    return random.randint(1000, 9999)

def send_otp_email(email):
    otp = generate_otp()
    send_email(
        app=current_app,
        to=email,
        subject="Your One-Time Password (OTP) for E-Shop Verification",
        body=f"""Dear User,\nThank you for choosing E-Shop!\nYour One-Time Password (OTP) is: {otp}. It’s valid for 5 minutes and can be used once.\nIf you didn’t request this, please ignore this email.\n\nHappy shopping!\n\nBest,\nThe E-Shop Team
         """
    )
    return otp