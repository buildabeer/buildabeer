require 'test_helper'

class WatersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @water = waters(:antwerp)
    @globals = 2
    @adminCount = 1
    @joeCount = 2

    @admin = users(:admin)
    @joe = users(:joe)
  end

  test "should get global and local index when signed in as admin" do
    # sign_in @admin
    # get waters_url, as: :json
    # print JSON.parse(@response.body)
    # assert(JSON.parse(@response.body).length == (@globals + @adminCount))
  end
  test "should get global and local index when signed in as non-admin" do
    # sign_in @joe
    # get waters_url, as: :json
    # print JSON.parse(@response.body)
    # assert(JSON.parse(@response.body).length == (@globals + @joeCount))
  end
  test "should only get global index when not signed in" do
    get waters_url, as: :json
    assert(JSON.parse(@response.body).length == @globals)
  end


  test "should show global water when not signed in" do
  end
  test "should not show local water when not signed in" do
  end
  test "should not show local water when signed in as other user" do
  end
  test "should show local water when signed in" do
  end


  test "should create local water when signed in" do
  end
  test "should create global water when signed in as admin" do
  end
  test "should not create global water when signed in as non-admin" do
  end
  test "should not create local water when not signed in" do
  end


  test "should update local water when signed in" do
  end
  test "should update global water when signed in as admin" do
  end
  test "should not update local water when not signed in" do
  end
  test "should not update local water when signed in as other user" do
  end
  test "should not update global water when signed in as non-admin" do
  end


  test "should destroy global when signed in as admin" do
  end
  test "should destroy local when signed in" do
  end
  test "should not destroy global when not signed in" do
  end
  test "should not destroy global when signed in as non-admin" do
  end
  test "should not destroy local when not signed in" do
  end
  test "should not destroy local when signed in as other user" do
  end


  # test "should get index" do
  #   get waters_url, as: :json
  #   assert_response :success
  # end

  # test "should create water" do
  #   assert_difference('Water.count') do
  #     post waters_url, params: { water: { name: @water.name } }, as: :json
  #   end

  #   assert_response 201
  # end

  # test "should show water" do
  #   get water_url(@water), as: :json
  #   assert_response :success
  # end

  # test "should update water" do
  #   patch water_url(@water), params: { water: { name: @water.name } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy water" do
  #   assert_difference('Water.count', -1) do
  #     delete water_url(@water), as: :json
  #   end

  #   assert_response 204
  # end
end
