class MeasurementSetting < ApplicationRecord
  @measurement_types = ["us", "metric"]
  @color_types = ["srm", "lovibond", "ebc"]
  @ibu_types = ["tinseth", "rager", "garetz", "daniels", "average"]

  belongs_to :user

  validates :liquid, :inclusion => { :in => @measurement_types }
  validates :temperature, :inclusion => { :in => @measurement_types }
  validates :hops, :inclusion => { :in => @measurement_types }
  validates :malts, :inclusion => { :in => @measurement_types }
  validates :agents, :inclusion => { :in => @measurement_types }
  validates :pressure, :inclusion => { :in => @measurement_types }
  validates :color, :inclusion => { :in => @color_types }
  validates :ibu, :inclusion => { :in => @ibu_types }
end
