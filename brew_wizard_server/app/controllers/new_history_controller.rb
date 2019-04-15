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
    render json: @new_history, include: { 
      boil_history: {},
      chill_history: {},
      fermentation_history: {},
      mash_history: {},
      mash_step_history: {},
      reminder_history: {},
      sparge_history: {},
      hlt_history: {}
    }
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

    mark_list = %w(mash_step_histories)
    mark_list.each { |m_list| black_mark(m_list, new_history_params) }

    if @new_history.user_id == current_user.id && @new_history.update(new_history_params)
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
      render json: ["Must be logged in."], status: :unprocessable_entity
    end

    if current_user.id == @new_history.user_id
      @new_history.destroy
    else
      render json: @new_history.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_new_history
      if user_signed_in?
        @new_history = NewHistory.where("user_id = ? AND id = ?", current_user.id, params[:id]).first
      end
    end

    def set_new_history_id
      @new_history = NewHistory.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def new_history_params
      params.require(:new_history).permit(:user_id, :recipe_id, :recipe_name, :brew_date, :ingredient_list,
        hlt_histories_attributes: [:id, :hlt_temp, :hlt_quantity, :agent_list, :hlt_notes],
        mash_histories_attributes: [:id, :hlt_addition, :hlt_addition_temp, :ingredient_list, 
                                    :ph_addition, :mash_notes],
        mash_step_histories_attributes: [:id, :mash_history_id, :step_counter, :step_temperature,
                                         :step_minutes, :step_water_temperature, :step_water_quantity],
        sparge_histories_attributes: [:id, :sparge_temperature, :sparge_quantity, :ingredient_list,
                                      :sparge_notes],
        boil_histories_attributes: [:id, :pre_boil_gravity, :pre_boil_quantity, :boil_minutes, 
                                    :ingredient_list, :gravity_additions, :boil_notes],
        chill_histories_attributes: [:id, :chill_method, :chill_minutes, :ingredient_list, :chill_notes],
        fermentation_histories_attributes: [:id, :wort_quantity, :fermentation_days, :original_gravity,
                                            :fermentation_temperature, :aeration_method, :aeration_minutes,
                                            :secondary_ferm_days, :ingredient_list, :fermentation_notes],
        reminder_histories_attributes: [:id, :possible_reminders, :added_reminders, :reminder_notes])
    end
end
