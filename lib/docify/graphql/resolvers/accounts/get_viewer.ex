defmodule Docify.Resolvers.Accounts.GetViewer do
  alias Docify.Repo

  def get_viewer(_parent, %{context: %{current_user: current_user}}) do
    current_user =
      current_user
      |> Repo.preload(:documents)

    {:ok, current_user}
  end
end
