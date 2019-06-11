defmodule Docify.Resolvers.Content.CreateDocument do
  alias Docify.Content

  def create_document(_parent, %{
        context: %{current_user: %{id: user_id}}
      }) do
    content = create_document_content

    case Content.create_document(%{user_id: user_id, content: content}) do
      {:error, reason} ->
        {:error, reason}

      {:ok, document} ->
        {:ok, %{document: document}}
    end
  end

  defp create_document_content do
    content_hash = %{
      document: %{
        nodes: [
          %{
            object: "block",
            type: "paragraph",
            nodes: [
              %{
                object: "text",
                leaves: [
                  %{
                    text: "Write your content here..."
                  }
                ]
              }
            ]
          }
        ]
      }
    }

    {:ok, content} = Jason.encode(content_hash)
    content
  end
end
