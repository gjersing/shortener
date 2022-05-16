require "test_helper"

class ShorturlsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @shorturl = shorturls(:one)
  end

  test "should get index" do
    get shorturls_url, as: :json
    assert_response :success
  end

  test "should create shorturl" do
    assert_difference("Shorturl.count") do
      post shorturls_url, params: { shorturl: { original_url: @shorturl.original_url, stub: @shorturl.stub } }, as: :json
    end

    assert_response :created
  end

  test "should show shorturl" do
    get shorturl_url(@shorturl), as: :json
    assert_response :success
  end

  test "should update shorturl" do
    patch shorturl_url(@shorturl), params: { shorturl: { original_url: @shorturl.original_url, stub: @shorturl.stub } }, as: :json
    assert_response :success
  end

  test "should destroy shorturl" do
    assert_difference("Shorturl.count", -1) do
      delete shorturl_url(@shorturl), as: :json
    end

    assert_response :no_content
  end
end
