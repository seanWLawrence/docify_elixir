defmodule Docify.Schema do
  use Absinthe.Schema

  import_types(Docify.Types.User)
  import_types(Docify.Types.Document)
  import_types(Docify.Scalars.DateTime)

  alias Docify.Resolvers.{Content, Accounts}

  query do
    @desc "Get the current user"
    field :viewer, :user do
      resolve(&Accounts.GetViewer.get_viewer/2)
    end

    @desc "Get a single document belonging to the current user by its id"
    field :document, :document do
      arg(:document_id, non_null(:id))

      resolve(&Content.GetDocument.get_document/2)
    end
  end

  mutation do
    @desc "Create a document for the current user"
    field :create_document, type: :document_mutation_payload do
      resolve(&Content.CreateDocument.create_document/2)
    end

    @desc "Update a document for the current user"
    field :update_document_content, type: :document_mutation_payload do
      arg(:document_id, non_null(:id))
      arg(:content, non_null(:string))

      resolve(&Content.UpdateDocument.update_document/2)
    end

    @desc "Delete a document for the current user"
    field :delete_document, type: :document_mutation_payload do
      arg(:id, non_null(:id))

      resolve(&Content.DeleteDocument.delete_document/2)
    end
  end
end
