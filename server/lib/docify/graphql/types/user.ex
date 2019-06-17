defmodule Docify.Types.User do
  use Absinthe.Schema.Notation

  object :user do
    field(:id, non_null(:id))
    field(:username, :string)
    field(:inserted_at, non_null(:datetime))
    field(:updated_at, non_null(:datetime))
    field(:documents, non_null(list_of(:document)))
  end
end
