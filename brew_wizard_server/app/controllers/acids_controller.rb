class AcidsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_acid, only: [:show, :update, :destroy]

  # GET /acids
  def index
    @acids = Acid.all

    render json: @acids.sort_by { |acid| acid.name.downcase }
  end

  # GET /acids/1
  def show
    render json: @acid
  end

  # POST /acids
  def create
    @acid = Acid.new(acid_params)

    if current_user.admin? && @acid.save
      render json: @acid, status: :created
    else
      render json: @acid.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /acids/1
  def update
    if(current_user.admin? && @acid.update(acid_params))
      render json: @acid
    else
      render json: @acid.errors, status: :unprocessable_entity
    end
  end

  # DELETE /acids/1
  def destroy
    if(current_user.admin?)
      @acid.destroy
    else
      render json: @acid.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_acid
      @acid = Acid.where("id = ?", params[:id]).first
    end

    # Only allow a trusted parameter "white list" through.
    def acid_params
      params.require(:acid).permit(:name, :strength, :quantity_for_normal, :molecular_weight, :density, :description)
    end
end
