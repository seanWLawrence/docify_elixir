defmodule DocifyWeb.PageController do
  use DocifyWeb, :controller
  import Docify.Auth, only: [load_current_user: 2]

  plug :load_current_user

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def about(conn, _params) do
    render(conn, "about.html")
  end

  def documents(conn, _params) do
    render(conn, "documents.html")
  end

  def support(conn, _params) do
    render(conn, "support.html")
  end

  def privacy_policy(conn, _params) do
    render(conn, "support.html")
  end

  def terms_and_conditions(conn, _params) do
    render(conn, "terms_and_conditions.html")
  end
end
