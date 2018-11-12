class MashStepsController < ApplicationController
  before_action :set_mash_step, only: [:show]

  # GET /mash_steps
  def index
    @mash_steps = MashStep.all

    render json: @mash_steps
  end

  # GET /mash_steps/1
  def show
    render json: @mash_step
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mash_step
      @mash_step = MashStep.find(params[:id])
    end
end
