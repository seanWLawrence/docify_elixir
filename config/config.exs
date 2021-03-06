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

# Guardian authentication
config :docify, Docify.Auth.Guardian,
  issuer: "docify",
  secret_key: "HNinpKh9Ne3tr8BpjCpAEh0xzCqTIG3PWsfkR2AtzvUaRIpbs6oIQ9RcmjmGPekJ"

config :docify, Docify.Auth.AuthAccessPipeline,
  module: Docify.Auth.Guardian,
  error_handler: Docify.Auth.AuthErrorHandler

# Ueberauth authentication validation
config :ueberauth, Ueberauth,
  base_path: "/login",
  providers: [
    identity: { Ueberauth.Strategy.Identity, [
        callback_methods: ["POST"],
        uid_field: :username,
      ] },
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"



