class User < ApplicationRecord
  has_secure_password
    has_many :budgets
    has_many :incomes
    has_many :expenses
  validates :email, presence: true, uniqueness: true
  validates :username, presence: true
  validates :password, length: { minimum: 6 }
end
