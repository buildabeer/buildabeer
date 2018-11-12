class MaltTypesController < ApplicationController
  before_action :set_malt_type, only: [:show]

  # GET /malt_types
  def index
    @malt_types = MaltType.all

    render json: @malt_types
  end

  # GET /malt_types/1
  def show
    render json: @malt_type
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_malt_type
      @malt_type = MaltType.where("id = ?", params[:id]).first
    end
end
