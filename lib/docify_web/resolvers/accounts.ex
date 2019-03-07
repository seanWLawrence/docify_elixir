defmodule DocifyWeb.Resolvers.Accounts do
  alias Docify.Accounts
  alias Docify.Content

  def user(_parent, %{id: id}, _resolution) do
    case Accounts.get_user!(id) do
      nil ->
        {:error, "User ID #{id} not found"}
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