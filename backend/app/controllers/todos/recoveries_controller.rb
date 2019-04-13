module Todos
  class RecoveriesController < ApplicationController
    before_action :is_signin

    def create
      @todo = current_user.todos.find(params[:todo_id])
      @todo.update(deleted_at: nil)
      render json: { success: true }
    end
  end
end
