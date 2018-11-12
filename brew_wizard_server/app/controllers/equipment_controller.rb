class EquipmentController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_equipment, only: [:show, :update, :destroy]

  # GET /equipments
  def index
    if !user_signed_in?
      @equipments = Equipment.where(global: true)
    else
      @equipments = Equipment.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @equipments.sort_by { |equipment| equipment.name.downcase }, methods: :recipe_count
  end

  # GET /equipments/1
  def show
    render json: @equipment, methods: :recipe_count
  end

  # POST /equipments
  def create
    @equipment = Equipment.new(equipment_params)
    @equipment.user_id = current_user.id

    if(@equipment["global"] && !current_user.admin?)
      @equipment["global"] = false
    end

    if @equipment.save
      render json: @equipment, status: :created, location: @equipment
    else
      render json: @equipment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /equipments/1
  def update
    if(equipment_params["global"] && !current_user.admin?)
      equipment_params["global"] = false
    end

    if((@equipment.user_id == current_user.id) || (@equipment["global"] && current_user.admin?)) && @equipment.update(equipment_params)
      render json: @equipment
    else
      render json: @equipment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /equipments/1
  def destroy
    if(current_user.id === @equipment.user_id || (current_user.admin? && @equipment["global"]))
      @equipment.destroy
    else
      render json: @equipment.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_equipment
      if !user_signed_in?
        @equipment = Equipment.where("id = ? AND global = ?", params[:id], true).first
      else
        @equipment = Equipment.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def equipment_params
      params.require(:equipment).permit(:name, :user_id, :global, :whirlpool,
        :hop_back, :batch_limit, :fly_sparge, :batch_sparge,
        :efficiency, :wl_hlt, :wl_mash, :wl_boil, :boil_rate, :description)
    end
end
