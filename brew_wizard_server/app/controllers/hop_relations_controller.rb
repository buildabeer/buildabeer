class HopRelationsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]
  before_action :set_hop_relation, only: [:destroy]

  # GET /hop_relations
  def index
    @hop_relations = HopRelation.all

    render json: @hop_relations
  end

  # POST /hop_relations
  def create
    if(!current_user || (!current_user.admin? && 
      !Hops.find(@hop_relation.hop_id).user_id != current_user.id && 
      !Hops.find(@hop_relation.hop_relation_id).user_id != current_user.id))
      render json: { error: 'You are not an admin.' }, status: :unprocessable_entity
    end

    @hop_relation = HopRelation.new(hop_relation_params)

    if @hop_relation.save
      render json: @hop_relation, status: :created
    else
      render json: @hop_relation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /hop_relations/1
  def destroy
    if(!current_user || (!current_user.admin? && 
      !Hops.find(@hop_relation.hop_id).user_id != current_user.id && 
      !Hops.find(@hop_relation.hop_relation_id).user_id != current_user.id))
      render json: { error: 'You are not an admin.' }, status: :unprocessable_entity
    end

    @hop_relation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hop_relation
      first_id, second_id = params[:id].split('-')
      @hop_relation = HopRelation.where("hop_id = ? AND hop_relation_id = ?", first_id, second_id).first
    end

    # Only allow a trusted parameter "white list" through.
    def hop_relation_params
      params.require(:hop_relation).permit(:hop_id, :hop_relation_id)
    end
end
