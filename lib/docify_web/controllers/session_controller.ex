defmodule DocifyWeb.SessionController do
  use DocifyWeb, :controller
  plug Ueberauth
  alias Docify.Accounts

  def request_login(conn, _params) do
    callback_url = Routes.session_path(conn, :handle_login_request, "identity")

    render(conn, "login.html", callback_url: callback_url)

    # conn
    # |> Routes.page_path(conn, :documents)
    # |> put_flash(:info, "Already logged in")
  end

  def handle_login_request(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: Routes.session_path(conn, :request_login))
  end

  def handle_login_request(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    %{extra: %{raw_info: %{"email" => email, "password" => password}}} = auth

    case Docify.Auth.authenticate_by_email_password(email, password) do
      {:ok, user} ->
        conn
          |> Docify.Auth.login(user)
          |> put_flash(:info, "Welcome back!")
          |> redirect(to: Routes.page_path(conn, :documents))
      {:error, reason} ->
        conn
        |> put_flash(:error, reason)
        |> redirect(to: Routes.session_path(conn, :request_login))
    end
  end

  def logout(conn, _params) do
    conn
    |> Docify.Auth.logout()
    |> put_flash(:info, "You have been logged out!")
    |> redirect(to: Routes.page_path(conn, :index) )
  end
end