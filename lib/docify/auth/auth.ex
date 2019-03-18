defmodule Docify.Auth do
  @moduledoc false

  import Ecto.Query
  import Plug.Conn
  alias Docify.Repo
  alias Docify.Auth.Guardian
  alias Docify.Password
  alias Docify.Accounts.User

  def authenticate_by_email_password(email, password) do
    query =
      from u in User,
        where: u.email == ^email

    case Repo.one(query) do
      nil ->
        Password.stub_verify()

      user ->
        user
        |> check_password(password)
    end
  end

  defp check_password(%{password_hash: password_hash} = user, password) do
    case Password.verify_hash(password, password_hash) do
      true -> {:ok, user}
      false -> {:error, "Incorrect password"}
    end
  end

  defp check_password(nil, _), do: {:error, "Incorrect username or password"}

  def login(conn, user) do
    conn
    |> Guardian.Plug.sign_in(user)
  end

  def logout(conn) do
    conn
    |> Guardian.Plug.sign_out()
  end

  def load_current_user(conn, _) do
    current_user = Guardian.Plug.current_resource(conn)

    case current_user do
      nil ->
        conn

      _ ->
        conn
        |> assign(:current_user, current_user)
        |> put_user_token(current_user)
    end
  end

  defp put_user_token(conn, user) do
    token = Phoenix.Token.sign(conn, "user socket", user.id)

    conn
    |> assign(:user_token, token)
  end
end
