defmodule Docify.Auth.AuthErrorHandler do
  @moduledoc false
  use DocifyWeb, :controller

  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    conn
    |> redirect(to: Routes.session_path(conn, :request_login))
  end
end