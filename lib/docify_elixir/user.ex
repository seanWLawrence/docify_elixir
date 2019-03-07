defmodule DocifyElixir.User do
  @moduledoc """
  The User context.
  """

  import Ecto.Query, warn: false
  alias DocifyElixir.Repo

  alias DocifyElixir.User.Documents

  @doc """
  Returns the list of documents.

  ## Examples

      iex> list_documents()
      [%Documents{}, ...]

  """
  def list_documents do
    Repo.all(Documents)
  end

  @doc """
  Gets a single documents.

  Raises `Ecto.NoResultsError` if the Documents does not exist.

  ## Examples

      iex> get_documents!(123)
      %Documents{}

      iex> get_documents!(456)
      ** (Ecto.NoResultsError)

  """
  def get_documents!(id), do: Repo.get!(Documents, id)

  @doc """
  Creates a documents.

  ## Examples

      iex> create_documents(%{field: value})
      {:ok, %Documents{}}

      iex> create_documents(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_documents(attrs \\ %{}) do
    %Documents{}
    |> Documents.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a documents.

  ## Examples

      iex> update_documents(documents, %{field: new_value})
      {:ok, %Documents{}}

      iex> update_documents(documents, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_documents(%Documents{} = documents, attrs) do
    documents
    |> Documents.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Documents.

  ## Examples

      iex> delete_documents(documents)
      {:ok, %Documents{}}

      iex> delete_documents(documents)
      {:error, %Ecto.Changeset{}}

  """
  def delete_documents(%Documents{} = documents) do
    Repo.delete(documents)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking documents changes.

  ## Examples

      iex> change_documents(documents)
      %Ecto.Changeset{source: %Documents{}}

  """
  def change_documents(%Documents{} = documents) do
    Documents.changeset(documents, %{})
  end
end
