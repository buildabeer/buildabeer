class YeastRelationsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]
  before_action :set_yeast_relation, only: [:destroy]

  # GET /yeast_relations
  def index
    @yeast_relations = YeastRelation.all

    render json: @yeast_relations
  end

  # POST /yeast_relations
  def create
    if(!current_user || (!current_user.admin? && 
      !Yeasts.find(@yeast_relation.yeast_id).user_id != current_user.id && 
      !Yeasts.find(@yeast_relation.yeast_relation_id).user_id != current_user.id))
      render json: { error: 'You are not an admin.' }, status: :unprocessable_entity
    end

    @yeast_relation = YeastRelation.new(yeast_relation_params)

    if @yeast_relation.save
      render json: @yeast_relation, status: :created
    else
      render json: @yeast_relation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /yeast_relations/1
  def destroy
    if(!current_user || (!current_user.admin? && 
      !Yeasts.find(@yeast_relation.yeast_id).user_id != current_user.id && 
      !Yeasts.find(@yeast_relation.yeast_relation_id).user_id != current_user.id))
      render json: { error: 'You are not an admin.' }, status: :unprocessable_entity
    end

    @yeast_relation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_yeast_relation
      first_id, second_id = params[:id].split('-')
      @yeast_relation = YeastRelation.where("yeast_id = ? AND yeast_relation_id = ?", first_id, second_id).first
    end

    # Only allow a trusted parameter "white list" through.
    def yeast_relation_params
      params.require(:yeast_relation).permit(:yeast_id, :yeast_relation_id)
    end
end
