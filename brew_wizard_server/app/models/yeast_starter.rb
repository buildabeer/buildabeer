class YeastStarter < ApplicationRecord
  belongs_to :recipe

  @aeration_methods = ["stir", "shake", "none"]

  validates :aeration_method, presence: true, :inclusion => { :in => @aeration_methods}
  validates :gravity, presence: true, numericality: { greater_than_or_equal_to: 1, less_than: 1.1 }
  validates :volume, presence: true, numericality: { greater_than_or_equal_to: 0.1, less_than_or_equal_to: 10 }
end
