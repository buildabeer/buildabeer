class WaterProfilesController < ApplicationController
  before_action :set_water_profile, only: [:show]

  # GET /water_profiles
  def index
    @water_profiles = WaterProfile.all

    render json: @water_profiles
  end

  # GET /water_profiles/1
  def show
    render json: @water_profile
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_water_profile
      @water_profile = WaterProfile.where("id = ?", params[:id]).first
    end
end
