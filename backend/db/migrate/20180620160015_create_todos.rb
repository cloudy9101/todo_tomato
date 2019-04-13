class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.string :name
      t.datetime :completed_at
      t.datetime :deleted_at
    end
  end
end
