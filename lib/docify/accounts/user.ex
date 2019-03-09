defmodule Docify.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Docify.Accounts.Credential

  schema "users" do
    field :name, :string
    field :username, :string
    has_one :credential, Credential

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username])
    |> cast_assoc(:credential)
    |> validate_required([:credential])
    |> unique_constraint(:username)
  end
end
