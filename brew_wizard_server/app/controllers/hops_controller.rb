class HopsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_hop, only: [:show, :update, :destroy]

  @@type_limits = ["Bittering", "Aroma", "Both"]

  # GET /hops
  def index
    if !user_signed_in?
      @hops = Hop.where(global: true)
    else
      @hops = Hop.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @hops.sort_by { |hop| hop.name.downcase }, methods: :recipe_count, include: [:hop_relations]
  end

  # GET /hops/1
  def show
    render json: @hop, methods: :recipe_count, include: [:hop_relations]
  end

  # POST /hops
  def create
    @hop = Hop.new(hop_params)
    @hop.user_id = current_user.id

    if(@hop["global"] && !current_user.admin?)
      @hop["global"] = false
    end

    if(!@@type_limits.include?(@hop["hop_type"]))
      @hop.hop_type = @@type_limits[0]
    end

    if @hop.save
      render json: @hop, status: :created, location: @hop
    else
      render json: @hop.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /hops/1
  def update
    if(hop_params["global"] && !current_user.admin?)
      hop_params["global"] = false
    end

    if(!@@type_limits.include?(@hop["hop_type"]))
      @hop.hop_type = @@type_limits[0]
    end

    # mark substitutes for destruction
    hop_save_ids = []
    if hop_params['hop_relations_attributes']
      hop_params['hop_relations_attributes'].each do |hop|
        hop_save_ids << hop['id']
      end
    end
    @hop.hop_relations.each do |hop|
      hop.mark_for_destruction if !hop_save_ids.include? hop.id
    end

    if((@hop.user_id == current_user.id) || (@hop["global"] && current_user.admin?)) && @hop.update(hop_params)
      render json: @hop
    else
      render json: @hop.errors, status: :unprocessable_entity
    end
  end

  # DELETE /hops/1
  def destroy
    if(current_user.id === @hop.user_id || (current_user.admin? && @hop["global"]))
      @hop.destroy
    else
      render json: @hop.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hop
      if !user_signed_in?
        @hop = Hop.where("id = ? AND global = ?", params[:id], true).first
      else
        @hop = Hop.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def hop_params
      params.require(:hop).permit(:name, :origin, :alpha, :hop_type, :beta,
        :description, :global, :user_id, :aromas, hop_relations_attributes: [:id, :hop_id, :hop_relation_id])
    end
end
