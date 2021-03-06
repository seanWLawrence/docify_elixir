defmodule DocifyWeb.Schema do
  use Absinthe.Schema
  import_types DocifyWeb.Schema.AccountTypes

  alias DocifyWeb.Resolvers

  query do
    field :user, :user do
      arg :id, non_null(:id)

      resolve &Resolvers.Accounts.user/3
    end
  end
end