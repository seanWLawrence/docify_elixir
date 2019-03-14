defmodule Docify.Repo.Migrations.AddAuthorIdToDocuments do
  use Ecto.Migration

  def change do
    alter table(:documents) do
      add :author_id, references(:authors, on_delete: :delete_all),
                      null: false
    end

    create index(:documents, [:author_id])
  end
end
