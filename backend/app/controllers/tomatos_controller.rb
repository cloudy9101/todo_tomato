class TomatosController < ApplicationController
  before_action :is_signin, :set_todo

  def create
    @tomato = @todo.tomatos.new(tomato_params.merge(user: current_user))
    render status: :unprocessable_entity unless @tomato.save
  end

  private

  def set_todo
    @todo = current_user.todos.find_by!(id: params[:todo_id])
  end

  def tomato_params
    params[:start_at] = Time.at(params[:start_at] / 1000) if params[:start_at]
    params[:end_at] = Time.at(params[:end_at] / 1000) if params[:end_at]
    params.permit(:start_at, :end_at)
  end
end
