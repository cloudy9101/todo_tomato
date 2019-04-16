class TodosController < ApplicationController
  before_action :is_signin

  def index
    @todos = current_user.todos.active
  end

  def create
    @todo = current_user.todos.new(name: params[:name])
    render status: :unprocessable_entity unless @todo.save
  end

  def destroy
    @todo = current_user.todos.find(params[:id])
    @todo.update(deleted_at: DateTime.current)
    render json: { success: true }
  end
end
