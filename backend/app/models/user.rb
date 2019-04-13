class User < ApplicationRecord
  has_secure_password

  has_many :todos
  has_many :tomatos
  validates :email, presence: true, email: true, uniqueness: true
end
