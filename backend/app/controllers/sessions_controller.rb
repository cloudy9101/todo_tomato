class SessionsController < ApplicationController
  before_action :set_user, only: :create

  def create
    if @user.authenticate(params[:password])
      signin @user
    else
      head 403
    end
  end

  def destroy
    session[:user_id] = nil
  end

  private

  def set_user
    @user = User.find_by!(email: params[:email])
  end

  def signin(user)
    session[:user_id] = user.id
  end
end
