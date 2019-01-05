class StyleYeastRelationsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]
  before_action :set_style_yeast_relation, only: [:destroy]

  # GET /style_yeast_relations
  def index
    @style_yeast_relations = StyleYeast.all

    render json: @style_yeast_relations
  end

  # POST /style_yeast_relations
  def create
    if(!current_user || (!current_user.admin? && 
      !Styles.find(@style_yeast_relation.style_id).user_id != current_user.id && 
      !Yeasts.find(@style_yeast_relation.yeast_id).user_id != current_user.id))
      render json: { error: 'You are not an admin.' }, status: :unprocessable_entity
    end

    @style_yeast_relation = StyleYeast.new(style_yeast_relation_params)

    if @style_yeast_relation.save
      render json: @style_yeast_relation, status: :created
    else
      render json: @style_yeast_relation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /style_yeast_relations/1
  def destroy
    if(!current_user || (!current_user.admin? && 
      !Styles.find(@style_yeast_relation.style_id).user_id != current_user.id && 
      !Yeasts.find(@style_yeast_relation.yeast_id).user_id != current_user.id))
      render json: { error: 'You are not an admin.' }, status: :unprocessable_entity
    end

    @style_yeast_relation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_style_yeast_relation
      first_id, second_id = params[:id].split('-')
      @style_yeast_relation = StyleYeast.where("style_id = ? AND yeast_id = ?", first_id, second_id).first
    end

    # Only allow a trusted parameter "white list" through.
    def style_yeast_relation_params
      params.require(:style_yeast_relation).permit(:yeast_id, :style_id)
    end
end
