class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, index: true
      t.string :password_digest
      t.string :nickname

      t.timestamps
    end
  end
end
