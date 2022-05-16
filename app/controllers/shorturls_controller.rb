class ShorturlsController < ApplicationController
  before_action :set_shorturl, only: %i[ show update destroy ]

  # GET /shorturls
  def index
    @shorturls = Shorturl.all

    render json: @shorturls
  end

  # GET /shorturls/1
  def show
    routeurl = Shorturl.find_by stub: params[:stub]
    redirect_to routeurl[:original_url], allow_other_host: true
  end

  # POST /shorturls
  def create
    @shorturl = Shorturl.new(shorturl_params)

    if @shorturl.save
      render json: @shorturl, status: :created, location: @shorturl
    else
      render json: @shorturl.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shorturls/1
  def update
    if @shorturl.update(shorturl_params)
      render json: @shorturl
    else
      render json: @shorturl.errors, status: :unprocessable_entity
    end
  end

  # DELETE /shorturls/1
  def destroy
    @shorturl.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shorturl
      @shorturl = Shorturl.find_by stub: params[:stub]
    end

    # Only allow a list of trusted parameters through.
    def shorturl_params
      params.require(:shorturl).permit(:original_url, :stub)
    end
end
