defmodule Registration do
  defp hashed_password(password) do
    Comeonin.Argon2.hashpwsalt(password)
  end
end