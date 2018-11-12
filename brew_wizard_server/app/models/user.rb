class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable, :confirmable
  include DeviseTokenAuth::Concerns::User

  after_create :setup_account

  validates_uniqueness_of :nickname
  validates_uniqueness_of :uid
  validates_uniqueness_of :email
  validates :nickname, length: { minimum: 1 }

  has_many :waters, dependent: :destroy
  has_many :water_agents, dependent: :destroy
  has_many :malts, dependent: :destroy
  has_many :yeasts, dependent: :destroy
  has_many :styles, dependent: :destroy
  has_many :equipment, dependent: :destroy
  has_many :hops, dependent: :destroy
  has_many :recipes, dependent: :destroy
  has_many :calendar_events, dependent: :destroy
  has_many :histories, dependent: :destroy
  has_one :measurement_setting, dependent: :destroy

  def setup_account
    self.measurement_setting = MeasurementSetting.create({ liquid: 'us', temperature: 'us', hops: 'us', malts: 'us', agents: 'metric', pressure: 'us' })
  end
end
