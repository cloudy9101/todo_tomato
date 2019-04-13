class CreateTomatoes < ActiveRecord::Migration[5.1]
  def change
    create_table :tomatoes do |t|
      t.references :todo
      t.references :user
      t.datetime :start_at
      t.datetime :end_at

      t.timestamps
    end
  end
end
