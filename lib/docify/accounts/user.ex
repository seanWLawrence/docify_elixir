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

  defp put_password_hash(
    %Ecto.Changeset{
      valid?: true, 
      changes: %{
        credential: %{
          password: password
        }
      }
    } = changeset
  ) do
    change(changeset, password: Argon2.add_hash(password))
  end

  defp put_password_hash(changeset), do: changeset
end
