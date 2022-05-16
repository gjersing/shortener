class Shorturl < ApplicationRecord
  validates :original_url, presence: true
  validates :stub, presence: true, uniqueness: true
end
