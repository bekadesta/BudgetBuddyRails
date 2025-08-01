module Api
  class IncomesController < ApplicationController
    
    before_action :require_login
    def index
  total_income =current_user.incomes.sum(:amount)
  render json: { total_income: total_income }
end
    def create
      income = current_user.incomes.new(income_params)

       if income.save
        render json: income, status: :created
      else
        render json: { errors: income.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def income_params
      params.require(:income).permit(:amount, :month)
    end
  end

end
