class StylesController < ApplicationController
  before_action :set_style, only: [:show, :update]
  before_action :set_style_id, only: [:destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  @@style_types = ["Ale", "Lager", "Wheat", "Wine", "Champagne", "Cider"]

  # GET /styles
  def index
    if !user_signed_in?
      @styles = Style.where(global: true)
    else
      @styles = Style.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @styles.sort_by { |style| style.name.downcase }, methods: :recipe_count#, include: [:yeasts]
  end

  def name_index
    if !user_signed_in?
      @styles = Style.where(global: true)
    else
      @styles = Style.where("global = ? OR user_id = ?", true, current_user.id)
    end

    render json: @styles.select("id, name").sort_by { |style| style.name.downcase }
  end

  # GET /styles/1
  def show
    render json: @style, methods: :recipe_count, include: [:yeasts]
  end

  # POST /styles
  def create
    @style = Style.new(style_params)
    @style.user_id = current_user.id
    @style.subcategory.upcase!

    if(@style["global"] && !current_user.admin?)
      @style["global"] = false
    end

    if !@@style_types.include? @style.style_type
      @style.style_type = @@style_types[0]
    end

    if @style.save
      render json: @style, status: :created
    else
      render json: @style.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /styles/1
  def update
    @style.subcategory.upcase!
    if(style_params["global"] && !current_user.admin?)
      style_params["global"] = false
    end

    if !@@style_types.include? @style.style_type
      @style.style_type = @@style_types[0]
    end

    if((@style.user_id == current_user.id) || (@style["global"] && current_user.admin?)) && @style.update(style_params)
      render json: @style
    else
      render json: @style.errors, status: :unprocessable_entity
    end
  end

  # DELETE /styles/1
  def destroy
    if(current_user.id === @style.user_id || (current_user.admin? && @style["global"]))
      @style.destroy
    else
      render json: @style.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_style
      if !user_signed_in?
        puts '1'
        @style = Style.where("id = ? AND global = ?", params[:id], true).first
      else
        puts '2'
        @style = Style.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    def set_style_id
      @style = Style.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def style_params
      params.require(:style).permit(:name, :category_name, :subcategory,
        :category_number, :style_type, :min_og, :max_og, :min_fg, :max_fg,
        :min_ibu, :max_ibu, :min_carb, :max_carb, :min_color, :max_color,
        :min_abv, :max_abv, :description, :profile, :ingredients, :examples,
        :style_yeast_attributes, :water_profile_id)
    end
end

