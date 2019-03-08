defmodule DocifyWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation
  import_types DocifyWeb.Scalars.DateTime

  object :document do
    field :id, non_null(:id)
    field :content, non_null(:string)
  end

  object :user do
    field :id, non_null(:id)
    field :username, non_null(:string)
    field :inserted_at, non_null(:datetime)
    field :updated_at, non_null(:datetime)
    field :documents, non_null(list_of(:document))
  end
end
