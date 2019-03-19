defmodule Docify.Resolvers.Content do
  alias Docify.Content

  def get_document(_parent, %{arguments: %{id: id}, context: %{current_user: %{id: user_id}}}) do
    document = Content.get_document!(id)

    belongs_to_current_user = document.user.id == user_id

    case belongs_to_current_user do
      true ->
        {:ok, document}

      false ->
        {:error, "Current user does not have a document with an id of #{id}"}
    end
  end

  def create_document(_parent, %{
        arguments: %{content: content},
        context: %{current_user: %{id: user_id}}
      }) do
    case Content.create_document(%{user_id: user_id, content: content}) do
      nil ->
        {:error, "The document could not be created"}

      document ->
        document
    end
  end
end
