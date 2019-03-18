defmodule Docify.Schema do
  use Absinthe.Schema
  import_types(Docify.Types.Accounts)

  alias Docify.Repo

  query do
    field :viewer, :user do
      arg(:id, non_null(:id))

      resolve(fn _, %{context: %{current_user: current_user}} ->
        current_user
        |> Repo.preload(:documents)

        {:ok, current_user}
      end)
    end
  end
end
