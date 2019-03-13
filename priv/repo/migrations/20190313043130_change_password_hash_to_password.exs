defmodule Docify.Repo.Migrations.ChangePasswordHashToPassword do
  use Ecto.Migration

  def change do
    rename table(:credentials), :password_hash, to: :password
  end
end
