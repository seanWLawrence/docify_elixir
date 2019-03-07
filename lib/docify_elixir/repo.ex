defmodule DocifyElixir.Repo do
  use Ecto.Repo,
    otp_app: :docify_elixir,
    adapter: Ecto.Adapters.Postgres
end
