class SessionController < ApplicationController
    def create
        user_info = request.env["omniauth.auth"]

        @hasAccount = User.find_by_uid(user_info['uid'])

        if @hasAccount
            session[:user] = @hasAccount
        else
            user = User.new
            user.uid = user_info["uid"]
            user.name = user_info["info"]["name"]
            user.save

            session[:user] = user
        end

        redirect_to root_path
    end

    def logged_in
        @status = false
        @name = nil
        if !!session[:user]
            @status = true
            @name = session[:user]["name"]
        end
        render json: {
            logged_in: @status,
            name: @name
        }
    end

    def destroy
        session.delete :user

        redirect_to root_path
    end
end
