class ApplicationController < ActionController::API
  def current_user
    User.find_by(id: session[:user_id])
  end

  def is_signin
    return head 403 unless current_user
  end
end
