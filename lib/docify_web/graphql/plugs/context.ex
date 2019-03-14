# defmodule DocifyWeb.Context do
#   @behaviour Plug

#   import Plug.Conn
#   import Ecto.Query, only: [where: 2]

#   alias Docify.{Repo, Accounts}

#   def init(opts), do: opts

#   def call(conn, _) do
#     context = build_context(conn)
#     Absinthe.Plug.put_options(conn, context: context)
#   end

#   @doc """
#   Return the current user context based on the authorization header
#   """
#   def build_context(conn) do
#     with ["Bearer " <> credential] <- get_req_header(conn, "authorization"),
#     {:ok, current_user} <- authorize(credential) do
#       %{current_user: current_user}
#     else
#       _ -> %{}
#     end
#   end

#   defp authorize(credential) do
#     User
#     |> where(credential: ^credential)
#     |> Repo.one
#     |> case do
#       nil -> {:error, "invalid authorization credential"}
#       user -> {:ok, user}
#     end
#   end

# end