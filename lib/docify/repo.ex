defmodule Docify.Repo do
  use Ecto.Repo,
    otp_app: :docify,
    adapter: Ecto.Adapters.Postgres
end
