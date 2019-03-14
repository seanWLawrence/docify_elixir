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

    plug DocifyWeb.Context
  end

  scope "/", DocifyWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/about", PageController, :about
    get "/privacy-policy", PageController, :privacy_policy
    get "/terms-and-conditions", PageController, :terms_and_conditions
    get "/support", PageController, :support
    
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

    get "/", SessionController, :request_login
    get "/:provider/callback", SessionController, :handle_login_request
    post "/:provider/callback", SessionController, :handle_login_request
  end

  scope "/logout", DocifyWeb do
    pipe_through [:browser, :auth]
    
    get "/", SessionController, :logout
  end

  @doc """
  Passes routes to GraphQL API
  """
  scope "/" do
    pipe_through [:session, :auth, :graphql]

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: DocifyWeb.Schema

    forward "/graphql", Absinthe.Plug,
      schema: DocifyWeb.Schema
  end

  @doc """
  Passes routes to React application
  """
  scope "/documents", DocifyWeb do
    pipe_through [:browser, :auth]

    get "/", PageController, :documents
    get "/demo", PageController, :documents
    get "/edit/:id", PageController, :documents
  end
end
