defmodule DocifyWeb.Router do
  use DocifyWeb, :router

  pipeline :auth do
    plug Docify.Auth.AuthAccessPipeline
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :session do
    plug :fetch_session
  end

  pipeline :graphql do
    plug :accepts, ["json"]

    plug Docify.Context
  end

  scope "/", DocifyWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/about", PageController, :about
    get "/privacy-policy", PageController, :privacy_policy
    get "/terms-and-conditions", PageController, :terms_and_conditions
    get "/support", PageController, :support
    get "/demo", PageController, :documents

    get "/signup", UserController, :new
    post "/signup", UserController, :create
  end

  scope "/account", DocifyWeb do
    pipe_through [:browser, :auth]

    get "/account", UserController, :show
    get "/account/edit", UserController, :edit
    put "/account/edit", UserController, :update
    delete "/account/edit", UserController, :delete
  end

  scope "/login", DocifyWeb do
    pipe_through :browser

    get "/", SessionController, :new
    # get "/:provider/callback", SessionController, :create
    post "/:provider/callback", SessionController, :create
  end

  scope "/logout", DocifyWeb do
    pipe_through [:browser, :auth]

    get "/", SessionController, :logout
  end

  scope "/" do
    pipe_through [:session, :auth, :graphql]

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: Docify.Schema

    forward "/graphql", Absinthe.Plug, schema: Docify.Schema
  end

  scope "/documents", DocifyWeb do
    pipe_through [:browser, :auth]

    get "/", PageController, :documents
    get "/edit/:id", PageController, :documents
  end
end
