defmodule Docify.Auth.AuthErrorHandler do
  @moduledoc false

  import Plug.Conn

  def auth_error(conn, _, _opts) do
    send_resp(conn, 401, "Unauthorized")
  end
end