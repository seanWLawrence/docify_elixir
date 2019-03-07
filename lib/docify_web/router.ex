defmodule DocifyWeb.Router do
  use DocifyWeb, :router

  defp authenticate_user(conn, _) do
    case get_session(conn, :user_id) do
      nil ->
        conn
        |> Phoenix.Controller.put_flash(:error, "Login required")
        |> Phoenix.Controller.redirect(to: "/")
        |> halt()
      user_id ->
        assign(conn, :current_user, Docify.Accounts.get_user!(user_id))
    end
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DocifyWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/about", PageController, :about
    resources "/users", UserController
    resources "/sessions", SessionController, only: [:new, :create, :delete],
      singleton: true
  end

  scope "/api" do
    pipe_through [:api, :authenticate_user]

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: DocifyWeb.Schema

    forward "/", Absinthe.Plug,
      schema: DocifyWeb.Schema

  end

  scope "/documents", DocifyWeb do
    pipe_through :browser

    get "/", PageController, :documents
    get "/demo", PageController, :documents
    get "/edit/:id", PageController, :documents
  end

  # Other scopes may use custom stacks.
  # scope "/api", DocifyWeb do
  #   pipe_through :api
  # end
end
