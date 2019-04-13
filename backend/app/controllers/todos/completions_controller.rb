module Todos
  class CompletionsController < ApplicationController
    before_action :is_signin
    before_action :set_todo

    def create
      @todo.update(completed_at: DateTime.current)
      render json: { success: true }
    end

    def destroy
      @todo.update(completed_at: nil)
      render json: { success: true }
    end

    private

    def set_todo
      @todo = current_user.todos.find(params[:todo_id])
    end
  end
end
