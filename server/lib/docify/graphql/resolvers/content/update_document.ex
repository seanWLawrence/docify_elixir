defmodule Docify.Resolvers.Content.UpdateDocument do
  alias Docify.Content
  import Docify.Resolvers.Content.Utils

  def update_document(_parent, %{
        context: %{current_user: %{id: user_id}},
        arguments: %{document_id: document_id, content: content}
      }) do
    document = Content.get_document(document_id)

    case return_doc_if_belongs_to_current_user(document, user_id) do
      {:ok, document} ->
        case Content.update_document(document, %{content: content}) do
          {:ok, document} ->
            {:ok, %{document: document}}

          {:error, reason} ->
            {:error, reason}
        end

      {:error, reason} ->
        {:error, reason}
    end
  end
end
