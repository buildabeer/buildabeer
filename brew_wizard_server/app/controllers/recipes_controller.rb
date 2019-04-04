class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy, :count]

  # GET /recipes
  def index
    skip = 0
    if (params["public"] && params["public"] == "true")
      @recipes = Recipe.where(global: true)
    else
      @recipes = Recipe.where("user_id = ?", current_user ? current_user.id : nil)
    end

    if params["search"]
      @recipes = @recipes.where("lower(name) LIKE ?", "%" + params["search"].downcase + "%")
    end

    category_id_list = Hash.new(0)
    @recipes.each do |recipe|
      category_id_list[recipe.style_id] += 1
    end
    categories = []
    category_id_list.each do |style, count|
      categories.push({style: Style.find_by(id: style), count: count})
    end

    if params["category_number"] && params["subcategory"]
      @recipes = @recipes.joins(:style).merge(Style.where("subcategory = ? AND category_number = ?", 
        params["subcategory"], params["category_number"]))
    end

    page_count = (@recipes.length / 20).floor + 1

    if params["page"]
      skip = (params["page"].to_i - 1) * 20
      if(skip > page_count - 1)
        skip = page_count - 1
      end
    end

    render json: { :recipe_list => (@recipes.sort_by { |recipe| recipe.name.downcase }[(0 + skip)...(20 + skip)]).as_json(
      include: [:style, :equipment, :water_profile], methods: :user_nickname),
            :page_count => page_count, :style_list => categories }
  end

  # GET /recipes/1
  def show
    render json: @recipe, include: { style: {}, equipment: {}, water_profile: {}, recipe_malts: {},
    malts: {}, recipe_waters: {}, waters: {}, recipe_water_agents: {},
    water_agents: {}, recipe_hops: {}, hops: { include: { hop_relations: {} } }, recipe_yeasts: {},
    recipe_mashes: {}, mash_steps: {}, target_water: {}, recipe_acids: {}, acids: {},
    recipe_sparge_acids: {}, sparge_acids: {},
    recipe_miscellaneous: {}, miscellaneous: {}, yeasts: { include: { yeast_relations: {} } },
    yeast_starters: {} }
  end

  def count
    render json: Recipe.where("user_id = ?", current_user.id).length
  end

  # POST /recipes
  def create
    if !current_user
      render json: @recipe.errors, status: :unprocessable_entity
    end

    @recipe = Recipe.create(recipe_params)
    @recipe.user_id = current_user.id

    if(@recipe["global"] && !current_user.admin?)
      @recipe["global"] = false
    end

    if(@recipe["global"] && !current_user.admin?)
      @recipe["global"] = false
    end

    if @recipe["recipe_date"]
      @recipe["recipe_date"] = @recipe["recipe_date"].to_date
    end

    if @recipe.save
      render json: @recipe, status: :created
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /recipes/1
  def update
    if !current_user
      render json: @recipe.errors, status: :unprocessable_entity
    end

    if(@recipe["global"] && !current_user.admin?)
      @recipe["global"] = false
    end

    if(@recipe["global"] && !current_user.admin?)
      @recipe["global"] = false
    end

    if @recipe["recipe_date"]
      @recipe["recipe_date"] = @recipe["recipe_date"].to_date
    end

    mark_list = %w(yeast_starters recipe_acids recipe_yeasts 
                   recipe_mashes recipe_malts recipe_hops recipe_water_agents
                   recipe_waters)
    mark_list.each { |m_list| black_mark(m_list, recipe_params) }

    if((@recipe.user_id == current_user.id) || (@recipe["global"] && current_user.admin?)) && @recipe.update(recipe_params)
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def black_mark(attribute, recipe_params)
    save_ids = []
    recipe_params[attribute + '_attributes'].each do |param|
      save_ids << param['id']
    end
    @recipe.public_send(attribute).each do |param|
      param.mark_for_destruction if !save_ids.include? param.id
    end
  end

  # DELETE /recipes/1
  def destroy
    if !current_user
      render json: @recipe.errors, status: :unprocessable_entity
    end

    if(current_user.id === @recipe.user_id || (current_user.admin? && @recipe["global"]))
      @recipe.destroy
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      if !user_signed_in?
        @recipe = Recipe.where("id = ? AND global = ?", params[:id], true).first
      else
        @recipe = Recipe.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    def set_recipe_id
      @recipe = Recipe.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def recipe_params
      params.require(:recipe).permit(:name, :id, :brewer, :recipe_date, :version,
        :recipe_id, :batch_size, :boil_time, :equipment_id, :notes, :description,
        :taste_notes, :style_id, :global, :target_water_id, :sparge_type, :mash_type,
        :storage_type, :storage_temperature, :carbonation_volumes, :carbonation_with,
        :primary_ferm_temp, :secondary_ferm_temp, :mash_ratio, :secondary_fermentation,
        :primary_ferm_days, :secondary_ferm_days, :efficiency, :recipe_type, :water_profile_id,
        recipe_waters_attributes: [:id, :water_id, :quantity, :boil],
        recipe_water_agents_attributes: [:id, :water_agent_id, :quantity],
        recipe_malts_attributes: [:id, :malt_id, :quantity, :color, :malt_usage],
        recipe_hops_attributes: [:id, :hop_id, :quantity, :alpha, :time, :form, :usage],
        recipe_yeasts_attributes: [:id, :yeast_id, :quantity, :fermentation_stage],
        recipe_acids_attributes: [:id, :acid_id, :quantity],
        recipe_sparge_acids_attributes: [:id, :acid_id, :quantity],
        recipe_mashes_attributes: [:id, :mash_step_id, :temperature, :time],
        recipe_miscellaneous_attributes: [:id, :miscellaneou_id, :quantity, :quantity_label, :time, :usage],
        yeast_starters_attributes: [:id, :aeration_method, :gravity, :volume])
    end
end
