class MaltsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_malt, only: [:show, :update, :destroy]

  # GET /malts
  def index
    if !user_signed_in?
      @malts = Malt.where(global: true)
    else
      @malts = Malt.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @malts.sort_by { |malt| malt.name.downcase }, :include => { malt_type: { :only => [:name, :efficiency_impact] } }, methods: :recipe_count
  end

  # GET /malts/names
  def name_index
    if !user_signed_in?
      @malts = Malt.select("id, name").where(global: true)
    else
      @malts = Malt.select("id, name").where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @malts.sort_by { |malt| malt.name.downcase }
  end

  # GET /malts/1
  def show
    render json: @malt, :include => { malt_type: { :only => [:name, :efficiency_impact] } }, methods: :recipe_count
  end

  # POST /malts
  def create
    @malt = Malt.new(malt_params)
    @malt.user_id = current_user.id

    if(@malt["global"] && !current_user.admin?)
      @malt["global"] = false
    end

    if(!MaltType.exists?(@malt["malt_type_id"]))
      render json: @malt.errors, status: :unprocessable_entity
    end

    if @malt.save
      render json: @malt, status: :created
    else
      render json: @malt.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /malts/1
  def update
    if(malt_params["global"] && !current_user.admin?)
      malt_params["global"] = false
    end

    if(!MaltType.exists?(@malt["malt_type_id"]))
      render json: @malt.errors, status: :unprocessable_entity
    end

    if((@malt.user_id == current_user.id) || (@malt["global"] && current_user.admin?)) && @malt.update(malt_params)
      render json: @malt
    else
      render json: @malt.errors, status: :unprocessable_entity
    end
  end

  # DELETE /malts/1
  def destroy
    if(current_user.id === @malt.user_id || (current_user.admin? && @malt["global"]))
      @malt.destroy
    else
      render json: @malt.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_malt
      if !user_signed_in?
        @malt = Malt.where("id = ? AND global = ?", params[:id], true).first
      else
        @malt = Malt.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def malt_params
      params.require(:malt).permit(:name, :global, :malt_yield, :origin,
        :malt_type_id, :references, :color, :potential, :yield, :max_percent,
        :must_mash, :protein, :diastatic_power, :description)
    end
end
