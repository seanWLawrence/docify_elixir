defmodule Docify.Types.Document do
  use Absinthe.Schema.Notation
  # import_types(Docify.Scalars.DateTime)

  object :document do
    field :id, non_null(:id)
    field :content, non_null(:string)
    field :inserted_at, non_null(:datetime)
    field :updated_at, non_null(:datetime)
  end
end
