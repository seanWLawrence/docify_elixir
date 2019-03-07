defmodule DocifyElixirWeb.Router do
  use DocifyElixirWeb, :router

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

  scope "/", DocifyElixirWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/about", PageController, :about
  end

  scope "/api" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: DocifyElixirWeb.Schema

    forward "/", Absinthe.Plug,
      schema: DocifyElixirWeb.Schema

  end

  scope "/documents", DocifyElixirWeb do
    pipe_through :browser

    get "/", PageController, :documents
    get "/demo", PageController, :documents
    get "/edit/:id", PageController, :documents
  end

  # Other scopes may use custom stacks.
  # scope "/api", DocifyElixirWeb do
  #   pipe_through :api
  # end
end
