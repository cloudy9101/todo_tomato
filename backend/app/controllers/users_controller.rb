class UsersController < ApplicationController
  def create
    @user = User.new(email: params[:email],
                     password: params[:password],
                     password_confirmation: params[:password_confirmation])
    if @user.save
      signin @user
    else
      head 403
    end
  end

  private

  def signin(user)
    session[:user_id] = user.id
  end
end
