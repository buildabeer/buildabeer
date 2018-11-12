class WaterAgentsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_water_agent, only: [:show, :update, :destroy]

  # GET /water_agents
  def index
    if !user_signed_in?
      @water_agents = WaterAgent.where(global: true)
    else
      @water_agents = WaterAgent.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @water_agents.sort_by { |water_agent| water_agent.name.downcase }, methods: :recipe_count
  end

  # GET /water_agents/1
  def show
    render json: @water_agent, methods: :recipe_count
  end

  # POST /water_agents
  def create
    @water_agent = WaterAgent.new(water_agent_params)
    @water_agent.user_id = current_user.id

    if(@water_agent["global"] && !current_user.admin?)
      @water_agent["global"] = false
    end

    if @water_agent.save
      render json: @water_agent, status: :created, location: @water_agent
    else
      render json: @water_agent.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /water_agents/1
  def update
    if(water_agent_params["global"] && !current_user.admin?)
      water_agent_params["global"] = false
    end

    if((@water_agent.user_id == current_user.id) || (@water_agent["global"] && current_user.admin?)) && @water_agent.update(water_agent_params)
      render json: @water_agent
    else
      render json: @water_agent.errors, status: :unprocessable_entity
    end
  end

  # DELETE /water_agents/1
  def destroy
    if(current_user.id === @water_agent.user_id || (current_user.admin? && @water_agent["global"]))
      @water_agent.destroy
    else
      render json: @water_agent.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_water_agent
      if !user_signed_in?
        @water_agent = WaterAgent.where("id = ? AND global = ?", params[:id], true).first
      else
        @water_agent = WaterAgent.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def water_agent_params
      params.require(:water_agent).permit(:global, :calcium, :sulfate, :magnesium,
        :chloride, :sodium, :bicarbonate, :ph, :name, :description)
    end
end
