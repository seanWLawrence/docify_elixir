defmodule Docify.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Docify.Content.Document
  alias Docify.Password

  schema "users" do
    field :name, :string
    field :username, :string
    field :email, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    has_many :documents, Document

    timestamps()
  end

  @doc false
  def changeset(user, attrs \\ %{}) do
    user
    |> cast(attrs, [:name, :username, :email])
    |> validate_required([:email, :password_hash])
    |> validate_length(:username, min: 3)
    |> unique_constraint(:username)
    |> unique_constraint(:email)
    |> cast_assoc(:documents)
  end

  def changeset_with_password(user, attrs \\ %{}) do
    user
    |> cast(attrs, [:password])
    |> validate_required(:password)
    |> validate_length(:password, min: 6)
    |> hash_password()
    |> changeset(attrs)
  end

  defp hash_password(%Ecto.Changeset{changes: %{password: password}} = changeset) do
    IO.inspect(password)

    changeset
    |> put_change(:password_hash, Password.hash(password))
  end

  defp hash_password(changeset), do: changeset
end
