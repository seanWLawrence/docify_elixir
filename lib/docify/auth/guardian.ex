defmodule Docify.Auth.Guardian do
  @moduledoc false

  use Guardian, otp_app: :docify

  alias Docify.Accounts

  def subject_for_token(%{id: user_id}, _claims) do
    {:ok, to_string(user_id)}
  end

  def resource_from_claims(%{"sub" => user_id}) do
    user = Accounts.get_user!(user_id)

    {:ok, user}
  end
end
