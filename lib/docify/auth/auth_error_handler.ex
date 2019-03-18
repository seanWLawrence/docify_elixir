defmodule Docify.Auth.AuthErrorHandler do
  @moduledoc false
  use DocifyWeb, :controller

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> redirect(to: Routes.session_path(conn, :new))
  end
end