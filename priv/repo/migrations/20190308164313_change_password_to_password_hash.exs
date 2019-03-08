defmodule Docify.Repo.Migrations.ChangePasswordToPasswordHash do
  use Ecto.Migration

  def change do
    rename table("credentials"), :password, to: :password_hash
  end
end
