class Api::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def show
    if current_user
      render json: current_user
    else
      render json: { error: 'Not logged in' }, status: :unauthorized
    end
  end

  def destroy
    session.delete(:user_id)
    render json: { message: 'Logged out' }
  end

def me
    if session[:user_id]
      user = User.find_by(id: session[:user_id])
      if user
        render json: { user: user }
      else
        render json: { user: nil }, status: :unauthorized
      end
    else
      render json: { user: nil }, status: :unauthorized
    end
  end
end

