require 'test_helper'

class WaterTest < ActiveSupport::TestCase

  def setup
    @admin = users(:admin)
    @joe = users(:joe)

    @water = Water.new(user_id: @joe.id, global: true, name: "Antwerp2, Belgium",
      ph: 8, calcium: 90, magnesium: 11, sodium: 37, sulfate: 84, chloride: 57,
      bicarbonate: 76)
    @antwerp = waters(:antwerp)
    @atlanta = waters(:atlanta)
  end

  test "should be valid" do
    assert @water.valid?
  end

  test "name should be present" do
    @water.name = ""
    assert_not @water.valid?
  end

  test "name should be at most 40 characters" do
    @water.name = "a" * 41
    assert_not @water.valid?
  end

  test "name/user_id combo should be unique" do
    @water.name = @antwerp.name
    @water.user_id = @antwerp.user_id
    assert_not @water.valid?
  end

  test "ph should be present" do
    @water.ph = ""
    assert_not @water.valid?
  end

  test "ph should not be < 0" do
    @water.ph = -0.1
    assert_not @water.valid?
  end

  test "ph should be valid when 0" do
    @water.ph = 0
    assert @water.valid?
  end

  test "ph should not be > 14" do
    @water.ph = 14.1
    assert_not @water.valid?
  end

  test "ph should be valid when 14" do
    @water.ph = 14
    assert @water.valid?
  end

  test "calcium should be present" do
    @water.calcium = ""
    assert_not @water.valid?
  end

  test "calcium should not be less than 0" do
    @water.calcium = -0.1
    assert_not @water.valid?
  end

  test "calcium should be valid when equal to 0" do
    @water.calcium = 0
    assert @water.valid?
  end

  test "calcium should be valid when 999.9" do
    @water.calcium = 999.9
    assert @water.valid?
  end

  test "calcium should not be 1000 or greater" do
    @water.calcium = 1000
    assert_not @water.valid?
  end

  test "magnesium should be present" do
    @water.magnesium = ""
    assert_not @water.valid?
  end

  test "magnesium should not be less than 0" do
    @water.magnesium = -0.1
    assert_not @water.valid?
  end

  test "magnesium should be valid when equal to 0" do
    @water.magnesium = 0
    assert @water.valid?
  end

  test "magnesium should be valid when 999.9" do
    @water.magnesium = 999.9
    assert @water.valid?
  end

  test "magnesium should not be 1000 or greater" do
    @water.magnesium = 1000
    assert_not @water.valid?
  end

  test "sodium should be present" do
    @water.sodium = ""
    assert_not @water.valid?
  end

  test "sodium should not be less than 0" do
    @water.sodium = -0.1
    assert_not @water.valid?
  end

  test "sodium should be valid when equal to 0" do
    @water.sodium = 0
    assert @water.valid?
  end

  test "sodium should be valid when 999.9" do
    @water.sodium = 999.9
    assert @water.valid?
  end

  test "sodium should not be 1000 or greater" do
    @water.sodium = 1000
    assert_not @water.valid?
  end

  test "sulfate should be present" do
    @water.sulfate = ""
    assert_not @water.valid?
  end

  test "sulfate should not be less than 0" do
    @water.sulfate = -0.1
    assert_not @water.valid?
  end

  test "sulfate should be valid when equal to 0" do
    @water.sulfate = 0
    assert @water.valid?
  end

  test "sulfate should be valid when 999.9" do
    @water.sulfate = 999.9
    assert @water.valid?
  end

  test "sulfate should not be 1000 or greater" do
    @water.sulfate = 1000
    assert_not @water.valid?
  end

  test "chloride should be present" do
    @water.chloride = ""
    assert_not @water.valid?
  end

  test "chloride should not be less than 0" do
    @water.chloride = -0.1
    assert_not @water.valid?
  end

  test "chloride should be valid when equal to 0" do
    @water.chloride = 0
    assert @water.valid?
  end

  test "chloride should be valid when 999.9" do
    @water.chloride = 999.9
    assert @water.valid?
  end

  test "chloride should not be 1000 or greater" do
    @water.chloride = 1000
    assert_not @water.valid?
  end

  test "bicarbonate should be present" do
    @water.bicarbonate = ""
    assert_not @water.valid?
  end

  test "bicarbonate should not be less than 0" do
    @water.bicarbonate = -0.1
    assert_not @water.valid?
  end

  test "bicarbonate should be valid when equal to 0" do
    @water.bicarbonate = 0
    assert @water.valid?
  end

  test "bicarbonate should be valid when 999.9" do
    @water.bicarbonate = 999.9
    assert @water.valid?
  end

  test "bicarbonate should not be 1000 or greater" do
    @water.bicarbonate = 1000
    assert_not @water.valid?
  end

  test "description should be less than or equal to 500 characters" do
    @water.description = "a" * 501
    assert_not @water.valid?
  end
end
