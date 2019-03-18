defmodule DocifyWeb.SessionController do
  use DocifyWeb, :controller
  plug Ueberauth

  def new(conn, _params) do
    callback_url = Routes.session_path(conn, :new, "identity")

    render(conn, "login.html", callback_url: callback_url)
  end

  def create(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: Routes.session_path(conn, :new))
  end

  def create(
        %{
          assigns: %{
            ueberauth_auth: %{
              extra: %{raw_info: %{"email" => email, "password_hash" => password}}
            }
          }
        } = conn,
        _params
      ) do
    case Docify.Auth.authenticate_by_email_password(email, password) do
      {:ok, user} ->
        conn
        |> Docify.Auth.login(user)
        |> put_flash(:info, "Welcome back!")
        |> redirect(to: Routes.page_path(conn, :documents))

      {:error, reason} ->
        conn
        |> put_flash(:error, reason)
        |> redirect(to: Routes.session_path(conn, :new))
    end
  end

  def logout(conn, _params) do
    conn
    |> Docify.Auth.logout()
    |> put_flash(:info, "You have been logged out!")
    |> redirect(to: Routes.page_path(conn, :index))
  end
end
