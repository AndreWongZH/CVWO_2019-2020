class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :uid
      t.string :name

      t.timestamps
    end

    create_table :todos do |t|
      t.string :title
      t.date :created
      t.date :deadline
      t.text :describe
      t.boolean :done
      t.string :tag
      t.string :uid

      t.timestamps
    end
  end
end
