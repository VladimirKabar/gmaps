require 'test_helper'

class MainControllerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get main_controller_index_url
    assert_response :success
  end

end
