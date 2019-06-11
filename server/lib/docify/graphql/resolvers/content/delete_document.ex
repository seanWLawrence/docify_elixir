defmodule Docify.Resolvers.Content.DeleteDocument do
  alias Docify.Content
  import Docify.Resolvers.Content.Utils

  def delete_document(_parent, %{
        arguments: %{id: id},
        context: %{current_user: %{id: user_id}}
      }) do
    case Content.get_document(id) do
      nil ->
        {:error, "Document with id #{id} does not exist"}

      document ->
        case return_doc_if_belongs_to_current_user(document, user_id) do
          {:error, reason} ->
            {:error, reason}

          {:ok, document} ->
            case Content.delete_document(document) do
              {:ok, document} ->
                {:ok, %{document: document}}

              {:error, reason} ->
                {:error, reason}
            end
        end
    end
  end
end
