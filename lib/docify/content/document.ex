defmodule Docify.Content.Document do
  use Ecto.Schema
  import Ecto.Changeset
  alias Docify.Accounts.User

  schema "documents" do
    field :content, :string
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(document, attrs) do
    document
    |> cast(attrs, [:content])
    |> cast_assoc(:user)
    |> validate_required([:content])
  end
end
