from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

from logs import get_logger
logger = get_logger(__name__)


def send_email(subject, to, context, template_name):
    try:
        context['DOMAIN_NAME'] = settings.DOMAIN_NAME
        html_message = render_to_string(template_name, context)
        plain_message = strip_tags(html_message)
        send_mail(subject, plain_message, from_email= settings.EMAIL_HOST_USER, recipient_list= [to], html_message=html_message)

    except Exception as e:
        logger.error(f"Email sending failed: {subject} to {to}")
        logger.error(f'error: {e}')
