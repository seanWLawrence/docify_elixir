defmodule Docify.User.Documents do
  use Ecto.Schema
  import Ecto.Changeset


  schema "documents" do
    field :context, :string

    timestamps()
  end

  @doc false
  def changeset(documents, attrs) do
    documents
    |> cast(attrs, [:context])
    |> validate_required([:context])
  end
end
