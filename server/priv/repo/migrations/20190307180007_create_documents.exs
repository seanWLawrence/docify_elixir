defmodule Docify.Repo.Migrations.CreateDocuments do
  use Ecto.Migration

  def change do
    create table(:documents) do
      add :content, :json, null: false, default: "{}"
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end
  end
end
