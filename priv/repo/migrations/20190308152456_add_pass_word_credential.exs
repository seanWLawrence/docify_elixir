defmodule Docify.Repo.Migrations.AddPassWordCredential do
  use Ecto.Migration

  def change do
    alter table(:credentials) do
      add :password, :string 
    end
  end
end
