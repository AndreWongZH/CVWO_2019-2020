class TodosController < ApplicationController
	before_action :set_todo, only: [:show, :update, :destroy]

	# GET /todos
	def index
		@sort = params[:sort]
		@ascend = params[:ascend] || 'ascending'

		@search = params[:search]

		@todos = Todo.apply_sort(@sort, @ascend).apply_search(@search)
		json_response(@todos)
	end

	# POST /todos
	def create
		@todo = Todo.create!(todo_params)
		json_response(@todo, :created)
	end

	# GET todos/:id
	def show
		json_response(@todo)
	end

	# PUT /todos/:id
	def update
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
		@past = Todo.search_past()
		@today = Todo.search_today()
		@tmr = Todo.search_tmr()
		@impt = Todo.search_impt()

		@data = {
			:past => @past,
			:today => @today,
			:tmr => @tmr,
			:impt => @impt
		}

		json_response(@data)
	end

	private
	
	def todo_params
		params.permit(:title, :created, :deadline, :describe, :done, :tag)
	end

	def set_todo
		@todo = Todo.find(params[:id])
	end
end
