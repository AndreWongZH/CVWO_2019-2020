class TodosController < ApplicationController
	before_action :set_todo, only: [:show, :update, :destroy]
	skip_before_action :verify_authenticity_token

	# GET /todos
	def index
		@uid = session[:user]['uid']
		
		@sort = params[:sort]
		@ascend = params[:ascend] || 'ascending'

		@search = params[:search]

		@tag = params[:tag]
		# @todos = Todo.all
		@todos = Todo.where(uid: @uid).apply_search(@search).apply_tag(@tag).apply_sort(@sort, @ascend)
		json_response(@todos)
	end

	# POST /todos
	def create
		@uid = session[:user]['uid']

		@todo = Todo.new todo_params
		@todo.uid = @uid
		@todo.save
		json_response(@todo, :created)
	end

	# GET todos/:id
	def show
		json_response(@todo)
	end

	# PUT /todos/:id
	def update
		@uid = session[:user]['uid']

		todo_params[:uid] = @uid
		@todo.update(todo_params)
		head :no_content
	end

	# DELETE /todos/:id
	def destroy
		@todo.destroy
		head :no_content
	end

	# GET /todos/focus
	def focus
		@uid = session[:user]['uid']

		@past = Todo.where(uid: @uid).search_past()
		@today = Todo.where(uid: @uid).search_today()
		@tmr = Todo.where(uid: @uid).search_tmr()
		@impt = Todo.where(uid: @uid).search_impt()

		@data = {
			:past => @past,
			:today => @today,
			:tmr => @tmr,
			:impt => @impt
		}

		json_response(@data)
	end

	# GET /todos/tags

	def tags
		@uid = session[:user]['uid']
		@tags = Todo.where(uid: @uid).get_tags()

		json_response(@tags)
	end

	private
	
	def todo_params
		params.permit(:title, :created, :deadline, :describe, :done, :tag)
	end

	def set_todo
		@todo = Todo.find(params[:id])
	end
end
