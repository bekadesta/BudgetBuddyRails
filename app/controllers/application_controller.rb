class ApplicationController < ActionController::API
    include ActionController::Cookies

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

def require_login
  unless current_user
    render json: { error: "Unauthorized" }, status: :unauthorized
    return # <- important to stop the action!
  end
end
end
