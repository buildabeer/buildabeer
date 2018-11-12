class MiscellaneousController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_miscellaneous, only: [:show, :update, :destroy]

  @@type_limits = ["Spice", "Fining", "Herb", "Flavor", "Other"]
  @@usage_limits = ["Boil", "Primary", "Mash", "Secondary", "Bottling"]

  # GET /miscellaneous
  def index
    if !user_signed_in?
      @miscellaneous = Miscellaneou.where(global: true)
    else
      @miscellaneous = Miscellaneou.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @miscellaneous.sort_by { |miscellaneous| miscellaneous.name.downcase }, methods: :recipe_count
  end

  # GET /miscellaneous/1
  def show
    render json: @miscellaneous, methods: :recipe_count
  end

  # POST /miscellaneous
  def create
    @miscellaneous = Miscellaneou.new(miscellaneous_params)
    @miscellaneous.user_id = current_user.id

    if(@miscellaneous["global"] && !current_user.admin?)
      @miscellaneous["global"] = false
    end

    if(!@@type_limits.include?(@miscellaneous["miscellaneous_type"]))
      @miscellaneous.miscellaneous_type = @@type_limits[0]
    end

    if @miscellaneous.save
      render json: @miscellaneous, status: :created, location: @miscellaneous
    else
      render json: @miscellaneous.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /miscellaneous/1
  def update
    if(miscellaneous_params["global"] && !current_user.admin?)
      miscellaneous_params["global"] = false
    end

    if(!@@type_limits.include?(@miscellaneous["miscellaneous_type"]))
      @miscellaneous.miscellaneous_type = @@type_limits[0]
    end

    if((@miscellaneous.user_id == current_user.id) || (@miscellaneous["global"] && current_user.admin?)) && @miscellaneous.update(miscellaneous_params)
      render json: @miscellaneous
    else
      render json: @miscellaneous.errors, status: :unprocessable_entity
    end
  end

  # DELETE /miscellaneous/1
  def destroy
    if(current_user.id === @miscellaneous.user_id || (current_user.admin? && @miscellaneous["global"]))
      @miscellaneous.destroy
    else
      render json: @miscellaneous.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_miscellaneous
      if !user_signed_in?
        @miscellaneous = Miscellaneou.where("id = ? AND global = ?", params[:id], true).first
      else
        @miscellaneous = Miscellaneou.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def miscellaneous_params
      params.require(:miscellaneou).permit(:name, :miscellaneous_type, :amount,
        :amount_label, :batch_size, :use_for, :time, :description, :usage, :global, :user_id)
    end
end
