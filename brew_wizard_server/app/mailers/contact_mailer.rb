class ContactMailer < ApplicationMailer
  default from: 'noreply@BuildA.Beer'

  def contact_email(message)
    @message = message
    mail(to: config.target_email, subject: "Contact Request: " + message.title)
  end
end
