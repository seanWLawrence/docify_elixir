defmodule Docify.Content.Document do
  use Ecto.Schema
  import Ecto.Changeset
  alias Docify.Content.Author


  schema "documents" do
    field :content, :string
    belongs_to :author, Author

    timestamps()
  end

  @doc false
  def changeset(document, attrs) do
    document
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end
end
