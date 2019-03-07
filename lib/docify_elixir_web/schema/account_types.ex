defmodule DocifyElixirWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation
  import_types DocifyElixirWeb.Scalars.DateTime

  object :user do
    field :id, non_null(:id)
    field :email, non_null(:string)
    field :inserted_at, non_null(:datetime)
    field :updated_at, non_null(:datetime)
  end
end
