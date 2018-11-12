class ContactMailer < ApplicationMailer
  default from: 'noreply@BuildA.Beer'

  def contact_email(message)
    @message = message
    mail(to: 'jdwyant8@gmail.com', subject: "Contact Request: " + message.title)
  end
end
