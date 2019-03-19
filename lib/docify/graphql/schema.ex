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
  end
end
