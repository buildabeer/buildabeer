class HistoriesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_history, only: [:show, :update, :destroy]

  # GET /histories
  def index
    @histories = History.where("user_id = ?", current_user ? current_user.id : nil)

    render json: @histories.sort_by { |history| history.brew_date }.reverse!
  end

  # GET /histories/1
  def show
    render json: @history
  end

  # POST /histories
  def create
    @history = History.new(history_params)
    @history.user_id = current_user.id


    if @history.save
      render json: @history, status: :created, location: @history
    else
      render json: @history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /histories/1
  def update
    if @history.update(history_params)
      render json: @history
    else
      render json: @history.errors, status: :unprocessable_entity
    end
  end

  # DELETE /histories/1
  def destroy
    @history.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_history
      @history = History.find(params[:id])
      if !current_user || @history.user_id != current_user.id
        @history = nil
      end
    end

    # Only allow a trusted parameter "white list" through.
    def history_params
      params.require(:history).permit(:og, :fg, :user_id, :gallons, :ingredients,
        :notes, :recipe_name, :recipe_id, :brew_date)
    end
end
