class Miscellaneou < ApplicationRecord
  @type_limits = ["Spice", "Fining", "Herb", "Flavor", "Other"]
  @usage_limits = ["Boil", "Primary", "Mash", "Secondary", "Bottling"]

  belongs_to :user
  has_many :recipe_miscellaneous, dependent: :destroy
  has_many :recipes, :through => :recipe_miscellaneous

  validates :name, presence: true, length: { maximum: 50 }
  validates :miscellaneous_type, presence: true, :inclusion => { :in => @type_limits }
  validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :batch_size, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: 100}
  validates :use_for, presence: true, length: { maximum: 50 }
  validates :time, presence: true
  validates :description, length: { maximum: 500 }
  validates :usage, presence: true, :inclusion => { :in => @usage_limits }
  validates :amount_label, presence: true, length: { maximum: 10 }

  def recipe_count
    return self.recipes.count
  end
end
