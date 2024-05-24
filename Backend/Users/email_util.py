import logging
import os
import boto3
from botocore.exceptions import ClientError
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()


SENDER = "mateohola09@gmail.com"
AWS_REGION = "us-east-2"
CHARSET = "UTF-8"
KEY=os.getenv("APLICATION_PASWWORD_EMAIL")

logger = logging.getLogger(__name__)

# Función para enviar un correo electrónico
def send_email(to_email: str, subject: str, body_text: str, body_html: str):
    try:
        message = MIMEMultipart()
        message['From'] = SENDER
        message['To'] = to_email
        message['Subject'] = subject
        message.attach(MIMEText(body_html, 'html'))

        # Configuración del servidor SMTP de Gmail
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587

        # Iniciar sesión en el servidor SMTP de Gmail
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()

        # Autenticarse en el servidor con la contraseña de aplicación
        server.login(SENDER, KEY)

        # Enviar el correo electrónico
        server.sendmail(SENDER, to_email, message.as_string())
        server.quit()

    except ClientError as e:
        logger.exception(
            (
                f'Error enviando email "{subject}" a {to_email}. '
                f'The error message is {e.response["Error"]["Message"]}'
            ),
            e,
        )