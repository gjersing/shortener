class Shorturl < ApplicationRecord
  validates :original_url, presence: true
  validates :stub, presence: true, uniqueness: true
  validates :stub, format: { with: /\A[a-zA-Z0-9]+\z/,
    message: "stub should only contain alphanumeric characters"}
end
