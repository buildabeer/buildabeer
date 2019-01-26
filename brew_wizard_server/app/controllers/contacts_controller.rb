class ContactsController < ApplicationController

  # POST /contacts
  def create
    @contact = Contact.new(contact_params)
    if current_user
      @contact.user_id = current_user.id
      if !@contact.email
        @contact.email = current_user.email
      end
    end

    if @contact.save
      ContactMailer.contact_email(@contact).deliver_later
      render json: @contact, status: :created
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  private

    # Only allow a trusted parameter "white list" through.
    def contact_params
      params.require(:contact).permit(:email, :phone, :name, :title,
        :message, :user_id)
    end
end
