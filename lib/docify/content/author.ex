defmodule Docify.Content.Author do
  use Ecto.Schema
  import Ecto.Changeset
  alias Docify.Accounts.User
  alias Docify.Content.Document


  schema "authors" do
    field :role, :string
    belongs_to :user, User
    has_many :documents, Document


    timestamps()
  end

  @doc false
  def changeset(author, attrs) do
    author
    |> cast(attrs, [:role])
    |> validate_required([:role])
    |> unique_constraint(:user_id)
  end
end
