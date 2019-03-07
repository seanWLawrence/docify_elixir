defmodule DocifyElixirWeb.Resolvers.Accounts do
  alias DocifyElixir.Accounts

  def user(_parent, %{id: id}, _resolution) do
    IO.inspect("Hello")
    case Accounts.get_user!(id) do
      nil ->
        {:error, "User ID #{id} not found"}
      user ->
        {:ok, user}
    end
  end
end