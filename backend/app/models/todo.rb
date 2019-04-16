class Todo < ApplicationRecord
  belongs_to :user
  has_many :tomatos
  validates :name, presence: true

  scope :active, -> { where(deleted_at: nil) }
  scope :deleted, -> { where.not(deleted_at: nil) }
end
