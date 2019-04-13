class Todo < ApplicationRecord
  belongs_to :user
  has_many :tomatos
  validates :name, presence: true
end
