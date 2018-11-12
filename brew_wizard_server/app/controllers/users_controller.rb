class UsersController < ApplicationController
  before_action :validate_current_user, only: [:update]

  # PATCH/PUT /malts/1
  def update
    @user = current_user
    if @user.update(user_params)
      render json: @malt
    else
      render json: @malt.errors, status: :unprocessable_entity
    end
  end

  private
    def validate_current_user
      if !current_user
        render json: { errors: "Please login before attempting to update." }
      end
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:uid, :name, :nickname, :image,
        :email, :contact, :recipe_reminders)
    end
end
