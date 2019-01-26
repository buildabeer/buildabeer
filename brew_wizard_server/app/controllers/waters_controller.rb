class WatersController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_water, only: [:show, :update, :destroy]

  # GET /waters
  def index
    if !user_signed_in?
      @waters = Water.where(global: true)
    else
      @waters = Water.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @waters.sort_by { |water| water.name.downcase }, methods: :recipe_count
  end

  # GET /waters/1
  def show
    render json: @water, methods: :recipe_count
  end

  # POST /waters
  def create
    @water = Water.new(water_params)
    @water.user_id = current_user.id

    if(@water["global"] && !current_user.admin?)
      @water["global"] = false
    end

    if @water.save
      render json: @water, status: :created
    else
      render json: @water.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /waters/1
  def update
    if(water_params["global"] && !current_user.admin?)
      water_params["global"] = false
    end

    if((@water.user_id == current_user.id) || (@water["global"] && current_user.admin?)) && @water.update(water_params)
      render json: @water
    else
      render json: @water.errors, status: :unprocessable_entity
    end
  end

  # DELETE /waters/1
  def destroy
    if(current_user.id === @water.user_id || (current_user.admin? && @water["global"]))
      @water.destroy
    else
      render json: @water.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_water
      if !user_signed_in?
        @water = Water.where("id = ? AND global = ?", params[:id], true).first
      else
        @water = Water.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def water_params
      params.require(:water).permit(:global, :calcium, :sulfate, :magnesium,
        :chloride, :sodium, :bicarbonate, :ph, :name, :description)
    end
end
