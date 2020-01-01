class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :title
      t.date :created
      t.date :deadline
      t.text :describe
      t.boolean :done
      t.string :tag

      t.timestamps
    end
  end
end
