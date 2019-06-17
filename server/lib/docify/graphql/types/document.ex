defmodule Docify.Types.Document do
  use Absinthe.Schema.Notation

  object :document do
    field(:id, non_null(:id))
    field(:content, non_null(:string))
    field(:inserted_at, non_null(:datetime))
    field(:updated_at, non_null(:datetime))
  end

  object :document_mutation_payload do
    field(:document, non_null(:document))
  end
end
