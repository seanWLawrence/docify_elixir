defmodule Docify.Repo.Migrations.CreateDocuments do
  use Ecto.Migration

  def change do
    create table(:documents) do
      add :context, :text

      timestamps()
    end

  end
end
