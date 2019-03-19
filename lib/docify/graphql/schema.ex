defmodule Docify.Schema do
  use Absinthe.Schema

  import_types(Docify.Types.User)
  import_types(Docify.Types.Document)
  import_types(Docify.Scalars.DateTime)

  alias Docify.Repo
  alias Docify.Resolvers

  query do
    @desc "Get the current user"
    field :viewer, :user do
      resolve(&Resolvers.Accounts.get_viewer/2)
    end

    @desc "Get a single document belonging to the current user by its id"
    field :document, :document do
      arg(:id, non_null(:id))
      resolve(&Resolvers.Content.get_document/2)
    end
  end

  mutation do
    @desc "Create a document for the current user"
    field :create_document, type: :document do
      arg(:content, non_null(:string))

      resolve(&Resolvers.Content.create_document/2)
    end
  end
end
