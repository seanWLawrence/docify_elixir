defmodule DocifyWeb.Context do
  alias Docify.Auth.Guardian

  def init(opts), do: opts

  def call(conn, _) do
    current_user = Guardian.Plug.current_resource(conn)
    context = %{current_user: current_user}

    Absinthe.Plug.put_options(conn, context: context)
  end
end