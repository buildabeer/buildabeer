class MeasurementSettingsController < ApplicationController
  before_action :set_measurement_setting, only: [:show, :update, :destroy]


  # GET /measurement_settings/1
  def show
    render json: @measurement_setting
  end

  # PATCH/PUT /measurement_settings/1
  def update
    if !user_signed_in?
      render json: { errors: ["You must log in first."] }, status: :unprocessable_entity
      return
    end

    @measurement_setting.user_id = current_user.id

    if @measurement_setting.update(measurement_setting_params)
      render json: @measurement_setting
    else
      render json: @measurement_setting.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_measurement_setting
      if(user_signed_in?)
        @measurement_setting = MeasurementSetting.find_by(user_id: current_user.id)
      else
        @measurement_setting = MeasurementSetting.new({ liquid: 'us', temperature: 'us', hops: 'us', malts: 'us', agents: 'metric', pressure: 'us', color: 'srm', ibu: 'tinseth' })
      end
    end

    # Only allow a trusted parameter "white list" through.
    def measurement_setting_params
      params.require(:measurement_setting).permit(:liquid, :temperature, :hops, :malts, :agents, :pressure, :color, :ibu)
    end
end
