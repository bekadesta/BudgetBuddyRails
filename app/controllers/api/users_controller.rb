class Api::UsersController < ApplicationController
    def index
    users = User.all
    render json: users
  end
def create
      user = User.new(user_params)
      if user.save
        session[:user_id] = user.id
        render json: { user: user }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
