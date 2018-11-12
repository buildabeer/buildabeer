class CalendarCheckerJob < ApplicationJob
  queue_as :default
  RUN_EVERY = 5.minutes

  after_perform do |job|
    self.class.set(wait: RUN_EVERY).perform_later
  end

  def perform(*args)
    reminder_dict = Hash.new{|h,k| h[k] = []}
    current_time = DateTime.now

    reminders = CalendarReminder.where("reminder_time >= ? AND reminder_time < ? AND sent = ?",
      current_time - 5.minutes, current_time + 5.minutes, false).includes({:calendar_event => :user})

    reminders.each do |reminder|
      if !reminder.sent && reminder.calendar_event.user.recipe_reminders
        reminder_dict[reminder.calendar_event.user.email].push(reminder.calendar_event.name + " \n " + reminder.calendar_event.description)
        reminder.sent = true;
        reminder.save!
      end
    end

    reminder_dict.each do |email, messages|
      CalendarEventMailer.calendar_email(email, messages.join('\r\n')).deliver_now
    end
  end
end
