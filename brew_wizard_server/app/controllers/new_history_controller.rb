class NewHistoriesController < ApplicationController
  before_action :set_new_history, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :update, :destroy, :count]

  # GET /new_histories
  def index
    render json: { errors: ["Must be logged in."] }, status: :unprocessable_entity unless current_user
    skip = 0

    @new_histories = NewHistory.where("user_id = ?", current_user.id)

    page_count = (@new_histories.length / 20).floor + 1

    if params["page"]
      skip = (params["page"].to_i - 1) * 20
      if(skip > page_count - 1)
        skip = page_count - 1
      end
    end

    render json: { :new_histories => (@new_histories[(0 + skip)...(20 + skip)]).as_json(
      include: [:style, :equipment, :water_profile]),
            :page_count => page_count, :style_list => categories }
  end

  # GET /new_histories/1
  def show
    render json: @new_history, include: { style: {}, equipment: {}, water_profile: {}, new_history_malts: {},
    malts: {}, new_history_waters: {}, waters: {}, new_history_water_agents: {},
    water_agents: {}, new_history_hops: {}, hops: { include: { hop_relations: {} } }, new_history_yeasts: {},
    new_history_mashes: {}, mash_steps: {}, target_water: {}, new_history_acids: {}, acids: {},
    new_history_sparge_acids: {}, sparge_acids: {},
    new_history_miscellaneous: {}, miscellaneous: {}, yeasts: { include: { yeast_relations: {} } },
    yeast_starters: {} }
  end

  def count
    render json: NewHistory.where("user_id = ?", current_user.id).length
  end

  # POST /new_histories
  def create
    if !current_user
      render json: @new_history.errors, status: :unprocessable_entity
    end

    @new_history = NewHistory.create(new_history_params)
    @new_history.user_id = current_user.id

    if(@new_history["global"] && !current_user.admin?)
      @new_history["global"] = false
    end

    if(@new_history["global"] && !current_user.admin?)
      @new_history["global"] = false
    end

    if @new_history["new_history_date"]
      @new_history["new_history_date"] = @new_history["new_history_date"].to_date
    end

    if @new_history.save
      render json: @new_history, status: :created
    else
      render json: @new_history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /new_histories/1
  def update
    if !current_user
      render json: @new_history.errors, status: :unprocessable_entity
    end

    if(@new_history["global"] && !current_user.admin?)
      @new_history["global"] = false
    end

    if(@new_history["global"] && !current_user.admin?)
      @new_history["global"] = false
    end

    if @new_history["new_history_date"]
      @new_history["new_history_date"] = @new_history["new_history_date"].to_date
    end

    mark_list = %w(yeast_starters new_history_acids new_history_yeasts 
                   new_history_mashes new_history_malts new_history_hops new_history_water_agents
                   new_history_waters)
    mark_list.each { |m_list| black_mark(m_list, new_history_params) }

    if((@new_history.user_id == current_user.id) || (@new_history["global"] && current_user.admin?)) && @new_history.update(new_history_params)
      render json: @new_history
    else
      render json: @new_history.errors, status: :unprocessable_entity
    end
  end

  def black_mark(attribute, new_history_params)
    save_ids = []
    new_history_params[attribute + '_attributes'].each do |param|
      save_ids << param['id']
    end
    @new_history.public_send(attribute).each do |param|
      param.mark_for_destruction if !save_ids.include? param.id
    end
  end

  # DELETE /new_histories/1
  def destroy
    if !current_user
      render json: @new_history.errors, status: :unprocessable_entity
    end

    if(current_user.id === @new_history.user_id || (current_user.admin? && @new_history["global"]))
      @new_history.destroy
    else
      render json: @new_history.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_new_history
      if !user_signed_in?
        @new_history = NewHistory.where("id = ? AND global = ?", params[:id], true).first
      else
        @new_history = NewHistory.where("(user_id = ? OR global = ?) AND id = ?", current_user.id, true, params[:id]).first
      end
    end

    def set_new_history_id
      @new_history = NewHistory.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def new_history_params
      params.require(:new_history).permit(:name, :id, :brewer, :new_history_date, :version,
        :new_history_id, :batch_size, :boil_time, :equipment_id, :notes, :description,
        :taste_notes, :style_id, :global, :target_water_id, :sparge_type, :mash_type,
        :storage_type, :storage_temperature, :carbonation_volumes, :carbonation_with,
        :primary_ferm_temp, :secondary_ferm_temp, :mash_ratio, :secondary_fermentation,
        :primary_ferm_days, :secondary_ferm_days, :efficiency, :new_history_type, :water_profile_id,
        new_history_waters_attributes: [:id, :water_id, :quantity, :boil],
        new_history_water_agents_attributes: [:id, :water_agent_id, :quantity],
        new_history_malts_attributes: [:id, :malt_id, :quantity, :color, :malt_usage],
        new_history_hops_attributes: [:id, :hop_id, :quantity, :alpha, :time, :form, :usage],
        new_history_yeasts_attributes: [:id, :yeast_id, :quantity, :fermentation_stage],
        new_history_acids_attributes: [:id, :acid_id, :quantity],
        new_history_sparge_acids_attributes: [:id, :acid_id, :quantity],
        new_history_mashes_attributes: [:id, :mash_step_id, :temperature, :time],
        new_history_miscellaneous_attributes: [:id, :miscellaneou_id, :quantity, :quantity_label, :time, :usage],
        yeast_starters_attributes: [:id, :aeration_method, :gravity, :volume])
    end
end
