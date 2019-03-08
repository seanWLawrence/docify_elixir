defmodule Docify.Accounts.Credential do
  use Ecto.Schema
  import Ecto.Changeset
  alias Docify.Accounts.User


  schema "credentials" do
    field :email, :string
    field :password_hash, :string
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(credential, attrs) do
    credential
    |> cast(attrs, [:email, :password_hash])
    |> validate_required([:email, :password_hash])
    |> unique_constraint(:email)
  end
end
