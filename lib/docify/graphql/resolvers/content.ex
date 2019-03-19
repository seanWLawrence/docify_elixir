defmodule Docify.Resolvers.Content do
  alias Docify.Content

  def get_document(_parent, %{arguments: %{id: id}, context: %{current_user: current_user}}) do
    document = Content.get_document!(id)

    belongs_to_current_user = document.user.id == current_user.id

    case belongs_to_current_user do
      true ->
        {:ok, document}

      false ->
        {:error, "Current user does not have a document with an id of #{id}"}
    end
  end
end
