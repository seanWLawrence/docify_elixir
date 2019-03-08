defmodule DocifyWeb.Resolvers.Accounts do
  alias Docify.Accounts
  alias Docify.Content

  def viewer(_parent, %{context: %{current_user: current_user}}, _resolution) do
    case current_user do
      nil ->
        {:error, "User not authenticated"}
      user -> 
        {:ok, user}
    end
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