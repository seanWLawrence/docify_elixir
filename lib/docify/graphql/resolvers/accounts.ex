defmodule Docify.Resolvers.Accounts do
  alias Docify.Accounts
  alias Docify.Content

  def viewer(_parent, context, _resolution) do
    IO.inspect "CONTEXT"
    IO.inspect context
    
    {:ok, %{id: "HELLO"}}
  end

  def documents(_parent, %{user_id: user_id}, _resolution) do
    case Content.list_documents do
      nil ->
        {:error, "User ID #{user_id} not found"}
      documents ->
        {:ok, documents}
    end
  end
end