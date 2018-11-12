require 'test_helper'

class WaterAgent < ActiveSupport::TestCase

  def setup
    @admin = users(:admin)
    @joe = users(:joe)

    @agent = WaterAgent.new(user_id: @joe.id, global: true, name: "Antwerp2, Belgium",
      ph: 8, calcium: 90, magnesium: 11, sodium: 37, sulfate: 84, chloride: 57,
      bicarbonate: 76)
    @agent1 = water_agents(:agent1)
    @agent2 = water_agents(:agent2)
  end

  test "should be valid" do
    assert @agent.valid?
  end

  test "name should be present" do
    @agent.name = ""
    assert_not @agent.valid?
  end

  test "name should be at most 40 characters" do
    @agent.name = "a" * 41
    assert_not @agent.valid?
  end

  test "name/user_id combo should be unique" do
    @agent.name = @agent1.name
    @agent.user_id = @agent1.user_id
    assert_not @agent.valid?
  end

  test "ph should be present" do
    @agent.ph = ""
    assert_not @agent.valid?
  end

  test "ph should not be < 0" do
    @agent.ph = -0.1
    assert_not @agent.valid?
  end

  test "ph should be valid when 0" do
    @agent.ph = 0
    assert @agent.valid?
  end

  test "ph should not be > 14" do
    @agent.ph = 14.1
    assert_not @agent.valid?
  end

  test "ph should be valid when 14" do
    @agent.ph = 14
    assert @agent.valid?
  end

  test "calcium should be present" do
    @agent.calcium = ""
    assert_not @agent.valid?
  end

  test "calcium should not be less than 0" do
    @agent.calcium = -0.1
    assert_not @agent.valid?
  end

  test "calcium should be valid when equal to 0" do
    @agent.calcium = 0
    assert @agent.valid?
  end

  test "calcium should be valid when 999.9" do
    @agent.calcium = 999.9
    assert @agent.valid?
  end

  test "calcium should not be 1000 or greater" do
    @agent.calcium = 1000
    assert_not @agent.valid?
  end

  test "magnesium should be present" do
    @agent.magnesium = ""
    assert_not @agent.valid?
  end

  test "magnesium should not be less than 0" do
    @agent.magnesium = -0.1
    assert_not @agent.valid?
  end

  test "magnesium should be valid when equal to 0" do
    @agent.magnesium = 0
    assert @agent.valid?
  end

  test "magnesium should be valid when 999.9" do
    @agent.magnesium = 999.9
    assert @agent.valid?
  end

  test "magnesium should not be 1000 or greater" do
    @agent.magnesium = 1000
    assert_not @agent.valid?
  end

  test "sodium should be present" do
    @agent.sodium = ""
    assert_not @agent.valid?
  end

  test "sodium should not be less than 0" do
    @agent.sodium = -0.1
    assert_not @agent.valid?
  end

  test "sodium should be valid when equal to 0" do
    @agent.sodium = 0
    assert @agent.valid?
  end

  test "sodium should be valid when 999.9" do
    @agent.sodium = 999.9
    assert @agent.valid?
  end

  test "sodium should not be 1000 or greater" do
    @agent.sodium = 1000
    assert_not @agent.valid?
  end

  test "sulfate should be present" do
    @agent.sulfate = ""
    assert_not @agent.valid?
  end

  test "sulfate should not be less than 0" do
    @agent.sulfate = -0.1
    assert_not @agent.valid?
  end

  test "sulfate should be valid when equal to 0" do
    @agent.sulfate = 0
    assert @agent.valid?
  end

  test "sulfate should be valid when 999.9" do
    @agent.sulfate = 999.9
    assert @agent.valid?
  end

  test "sulfate should not be 1000 or greater" do
    @agent.sulfate = 1000
    assert_not @agent.valid?
  end

  test "chloride should be present" do
    @agent.chloride = ""
    assert_not @agent.valid?
  end

  test "chloride should not be less than 0" do
    @agent.chloride = -0.1
    assert_not @agent.valid?
  end

  test "chloride should be valid when equal to 0" do
    @agent.chloride = 0
    assert @agent.valid?
  end

  test "chloride should be valid when 999.9" do
    @agent.chloride = 999.9
    assert @agent.valid?
  end

  test "chloride should not be 1000 or greater" do
    @agent.chloride = 1000
    assert_not @agent.valid?
  end

  test "bicarbonate should be present" do
    @agent.bicarbonate = ""
    assert_not @agent.valid?
  end

  test "bicarbonate should not be less than 0" do
    @agent.bicarbonate = -0.1
    assert_not @agent.valid?
  end

  test "bicarbonate should be valid when equal to 0" do
    @agent.bicarbonate = 0
    assert @agent.valid?
  end

  test "bicarbonate should be valid when 999.9" do
    @agent.bicarbonate = 999.9
    assert @agent.valid?
  end

  test "bicarbonate should not be 1000 or greater" do
    @agent.bicarbonate = 1000
    assert_not @agent.valid?
  end

  test "description should be less than or equal to 500 characters" do
    @agent.description = "a" * 501
    assert_not @agent.valid?
  end
end
