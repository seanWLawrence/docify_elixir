defmodule DocifyWeb.Schema do
  use Absinthe.Schema
  import_types DocifyWeb.Schema.AccountTypes

  alias DocifyWeb.Resolvers

  query do
    field :viewer, :user do
      arg :id, non_null(:id)

      resolve fn _, %{context: %{current_user: current_user}} ->
        {:ok, current_user}
    end
    end
  end
end

