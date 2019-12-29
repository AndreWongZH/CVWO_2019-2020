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

	private
	
	def todo_params
		params.permit(:title, :created, :deadline, :desc, :done, :tag)
	end

	def set_todo
		@todo = Todo.find(params[:id])
	end
end
