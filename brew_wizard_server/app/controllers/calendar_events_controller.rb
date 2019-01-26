class CalendarEventsController < ApplicationController
  before_action :authenticate_user!, only: [:multi_create, :create, :update, :destroy]
  before_action :set_calendar_event, only: [:show, :update, :destroy]

  # GET /calendar_events
  def index
    calendar_start_date = params['calendar_start'].to_date
    calendar_end_date = params['calendar_end'].to_date

    @calendar_events = CalendarEvent.where("user_id = ? AND (calendar_start > ? AND calendar_end <= ?)", (current_user ? current_user.id : nil), calendar_start_date, calendar_end_date)

    render json: @calendar_events.sort_by { |event| event.calendar_start }, include: [:calendar_reminders]
  end

  # POST /calendar_events
  def create
    @calendar_event = CalendarEvent.new(calendar_event_params)
    @calendar_event.user_id = current_user.id

    if @calendar_event.save
      render json: @calendar_event, status: :created
    else
      render json: @calendar_event.errors, status: :unprocessable_entity
    end
  end

  # POST /calendar_events
  def multi_create
    @calendar_events = []
    success = false

    calendar_event_params_multiple.each do |event|
      calendar_event = CalendarEvent.new(event)
      calendar_event.user_id = current_user.id
      @calendar_events << calendar_event
    end

    CalendarEvent.transaction do
      success = @calendar_events.map(&:save)
      unless success.all?
        errored = @calendar_events.select{ |event| event.errors.present? }
        raise ActiveRecord::Rollback
      end
    end

    if success.all?
      render json: @calendar_events, status: :created
    else
      render json: @calendar_events.map(&:errors), status: :unprocessable_entity
    end
  end

  # PATCH/PUT /calendar_events/1
  def update

    #mark reminders for destruction
    reminder_save_ids = []
    calendar_event_params['calendar_reminders_attributes'].each do |reminder|
      reminder_save_ids << reminder['id']
    end
    @calendar_event.calendar_reminders.each do |reminder|
      reminder.mark_for_destruction if !reminder_save_ids.include? reminder.id
    end

    if @calendar_event.user_id == current_user.id && @calendar_event.update(calendar_event_params)
      render json: @calendar_event
    else
      render json: @calendar_event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /calendar_events/1
  def destroy
    if current_user.id === @calendar_event.user_id
      @calendar_event.destroy
    else
      render json: @calendar_event.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_calendar_event
      @calendar_event = CalendarEvent.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def calendar_event_params
      params.require(:calendar_event).permit(:name, :description, :calendar_start, :calendar_end, :color,
        calendar_reminders_attributes: [:id, :reminder_time, :sent])
    end

    # Only allow a trusted parameter "white list" through.
    def calendar_event_params_multiple
      params.require(:calendar_events).map do |p|
        p.permit(:name, :description, :calendar_start, :calendar_end, :color,
              calendar_reminders_attributes: [:id, :reminder_time, :sent])
      end
    end
end
