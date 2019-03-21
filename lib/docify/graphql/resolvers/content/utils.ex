defmodule Docify.Resolvers.Content.Utils do
  alias Docify.Content

  def return_doc_if_belongs_to_current_user(document, user_id, as_tuple? \\ true) do
    case belongs_to_current_user(document, user_id) do
      true ->
        if as_tuple? do
          {:ok, document}
        else
          document
        end

      false ->
        {:error, "Current user does not have a document with an id of #{document.id}"}
    end
  end

  defp belongs_to_current_user(document, user_id) do
    document.user.id == user_id
  end
end
