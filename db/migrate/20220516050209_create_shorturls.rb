class CreateShorturls < ActiveRecord::Migration[7.0]
  def change
    create_table :shorturls do |t|
      t.string :original_url
      t.string :stub

      t.timestamps
    end
  end
end
