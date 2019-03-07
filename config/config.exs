# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :docify_elixir,
  ecto_repos: [DocifyElixir.Repo]

# Configures the endpoint
config :docify_elixir, DocifyElixirWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "qGtHrfWUP77B1rOTwWBAzlmvdBDR0KALyYuaUEBaSTpiUsmrW3ofjGv7K3ARxGxM",
  render_errors: [view: DocifyElixirWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: DocifyElixir.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
