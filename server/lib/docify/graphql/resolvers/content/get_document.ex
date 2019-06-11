defmodule Docify.Resolvers.Content.GetDocument do
  alias Docify.Content
  import Docify.Resolvers.Content.Utils

  def get_document(_parent, %{
        arguments: %{document_id: document_id},
        context: %{current_user: %{id: user_id}}
      }) do
    case Content.get_document(document_id) do
      nil ->
        {:error, "Document with id #{document_id} does not exist"}

      document ->
        return_doc_if_belongs_to_current_user(document, user_id)
    end
  end
end
