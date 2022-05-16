require "test_helper"

class ShorturlTest < ActiveSupport::TestCase
  def setup
    @validUrl = Shorturl.create(original_url: "http://test.com", stub: "test")
    @noStubUrl = Shorturl.new(original_url: "http://test.com")
    @noOrigUrl = Shorturl.new(stub: "stub")
  end

  test "url should be valid" do
    assert @validUrl.valid?
  end

  test "no stub url should be invalid" do
    assert_not @noStubUrl.valid?
  end

  test "no original url should be invalid" do
    assert_not @noOrigUrl.valid?
  end

  test "stub should be unique" do
    duplicate_url = @validUrl.dup
    assert_not duplicate_url.valid?
  end
end
