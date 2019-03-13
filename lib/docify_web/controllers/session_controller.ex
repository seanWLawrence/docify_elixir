defmodule DocifyWeb.SessionController do
  use DocifyWeb, :controller
  plug Ueberauth
  alias DocifyWeb.Router.Helpers
  alias Docify.Accounts

  def request_login(conn, _params) do
    callback_url = Helpers.session_path(conn, :handle_request, "identity")

    render(conn, "login.html", callback_url: callback_url)
  end

  def handle_request(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: Helpers.session_path(conn, :request_login))
  end

  def handle_request(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    %{extra: %{raw_info: %{"email" => email, "password" => password}}} = auth

    case Accounts.authenticate_by_email_password(email, password) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Successfully authenticated.")
        |> put_session(:current_user, user)
        |> redirect(to: Helpers.page_path(conn, :documents))
      {:error, reason} ->
        conn
        |> put_flash(:error, reason)
        |> redirect(to: Helpers.session_path(conn, :request_login))
    end
  end

  def logout(conn, _params) do
    conn
    |> put_flash(:info, "You have been logged out!")
    |> configure_session(drop: true)
    |> redirect(to: Helpers.page_path(conn, :index) )
  end
end