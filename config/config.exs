# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :docify,
  ecto_repos: [Docify.Repo]

# Configures the endpoint
config :docify, DocifyWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "qGtHrfWUP77B1rOTwWBAzlmvdBDR0KALyYuaUEBaSTpiUsmrW3ofjGv7K3ARxGxM",
  render_errors: [view: DocifyWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Docify.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

# Ueberauth Config for oauth
config :ueberauth, Ueberauth,
  base_path: "/login",
  providers: [
    google: { Ueberauth.Strategy.Google, [] },
    identity: { Ueberauth.Strategy.Identity, [
        callback_methods: ["POST"],
        uid_field: :username,
      ] },
  ]
# Ueberauth Strategy Config for Google oauth
config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET"),
  redirect_uri: System.get_env("GOOGLE_REDIRECT_URI")

# Guardian configuration
config :docify, Docify.Guardian,
  verify_module: Guardian.Token.Jwt.Verify, 
  issuer: "Docify",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true,
  secret_key: System.get_env("GUARDIAN_SECRET")