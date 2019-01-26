class YeastsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_yeast, only: [:show, :update, :destroy]

  @@yeast_types = ["Ale", "Lager", "Wheat", "Wine", "Champagne", "Cider"]
  @@yeast_forms = ["Liquid", "Dry"]

  # GET /yeasts
  def index
    if !user_signed_in?
      @yeasts = Yeast.where(global: true)
    else
      @yeasts = Yeast.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @yeasts.sort_by { |yeast| yeast.name.downcase }, include: [:style_yeasts, :yeast_relations], methods: :recipe_count
  end

  def index_names
    if !user_signed_in?
      @yeasts = Yeast.where(global: true)
    else
      @yeasts = Yeast.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @yeasts.select("id, name, product_id").sort_by { |yeast| yeast.name.downcase }
  end

  # GET /yeasts/1
  def show
    render json: @yeast, include: [:style_yeasts, :yeast_relations], methods: :recipe_count
  end

  # POST /yeasts
  def create
    @yeast = Yeast.new(yeast_params)
    @yeast.user_id = current_user.id

    if(@yeast["global"] && !current_user.admin?)
      @yeast["global"] = false
    end

    if !@@yeast_types.include? @yeast.yeast_type
      @yeast.yeast_type = @@yeast_types[0]
    end

    if !@@yeast_forms.include? @yeast.form
      @yeast.form = @@yeast_forms[0]
    end

    if @yeast.save
      render json: @yeast, status: :created
    else
      render json: @yeast.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /yeasts/1
  def update
    if(yeast_params["global"] && !current_user.admin?)
      yeast_params["global"] = false
    end

    if !@@yeast_types.include? @yeast.yeast_type
      @yeast.yeast_type = @@yeast_types[0]
    end

    if !@@yeast_forms.include? @yeast.form
      @yeast.form = @@yeast_forms[0]
    end

    #mark styles for destruction
    style_save_ids = []
    if yeast_params['style_yeasts_attributes']
      yeast_params['style_yeasts_attributes'].each do |style|
        style_save_ids << style['id']
      end
    end
    @yeast.style_yeasts.each do |style|
      style.mark_for_destruction if !style_save_ids.include? style.id
    end

    # mark substitutes for destruction
    yeast_save_ids = []
    if yeast_params['yeast_relations_attributes']
      yeast_params['yeast_relations_attributes'].each do |yeast|
        yeast_save_ids << yeast['id']
      end
    end
    @yeast.yeast_relations.each do |yeast|
      yeast.mark_for_destruction if !yeast_save_ids.include? yeast.id
    end

    if((@yeast.user_id == current_user.id) || (@yeast["global"] && current_user.admin?)) && @yeast.update(yeast_params)
      render json: @yeast
    else
      render json: @yeast.errors, status: :unprocessable_entity
    end
  end

  # DELETE /yeasts/1
  def destroy
    if(current_user.id === @yeast.user_id || (current_user.admin? && @yeast["global"]))
      @yeast.destroy
    else
      render json: @yeast.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_yeast
      if !user_signed_in?
        @yeast = Yeast.where("id = ? AND global = ?", params[:id], true).first
      else
        @yeast = Yeast.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    # Only allow a trusted parameter "white list" through.
    def yeast_params
      params.require(:yeast).permit(:user_id, :id, :description, :global, :name, :cell_count, :lab, :product_id,
        :yeast_type, :form, :min_attenuation, :max_attenuation, :flocculation,
        :min_temperature, :max_temperature, style_yeasts_attributes: [:yeast_id, :style_id, :id],
        yeast_relations_attributes: [:id, :yeast_id, :yeast_relation_id])
    end
end
