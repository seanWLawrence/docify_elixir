defmodule DocifyWeb.PageController do
  use DocifyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def about(conn, _params) do
    render(conn, "about.html")
  end

  def documents(conn, _params) do
    render(conn, "documents.html")
  end
end
