class CalendarEventMailer < ApplicationMailer
  default from: 'noreply@BuildA.Beer'

  def calendar_email(email, message)
    @message = message
    mail(to: email, subject: "Friendly reminder about your beer!")
  end
end
