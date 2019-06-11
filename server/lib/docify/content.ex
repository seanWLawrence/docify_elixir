defmodule Docify.Content do
  @moduledoc """
  The Content context.
  """

  import Ecto.Query, warn: false
  alias Docify.Repo

  alias Docify.Content.Document
  alias Docify.Accounts.User

  @doc """
  Returns the list of documents.

  ## Examples

      iex> list_documents()
      [%Document{}, ...]

  """
  def list_documents do
    Document
    |> Repo.all()
    |> Repo.preload(:user)
  end

  @doc """
  Gets a single document.

  Raises `Ecto.NoResultsError` if the Document does not exist.

  ## Examples

      iex> get_document!(123)
      %Document{}

      iex> get_document!(456)
      ** (Ecto.NoResultsError)

  """
  def get_document!(id) do
    Document
    |> Repo.get!(id)
    |> Repo.preload(:user)
  end

  @doc """
  Gets a single document.

  Returns nil if document does not exist.

  ## Examples

      iex> get_document(123)
      %Document{}

      iex> get_document!(456)
      {:error: reason}

  """
  def get_document(id) do
    Document
    |> Repo.get(id)
    |> Repo.preload(:user)
  end

  @doc """
  Creates a document.

  ## Examples

      iex> create_document(%{field: value})
      {:ok, %Document{}}

      iex> create_document(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_document(%{user_id: user_id, content: content}) do
    %Document{}
    |> Document.changeset(%{user_id: user_id, content: content})
    |> Ecto.Changeset.put_change(:user_id, user_id)
    |> Repo.insert()
  end

  def ensure_user_exists(%{user_id: user_id}) do
    user_id
    |> Ecto.Changeset.change()
    |> Ecto.Changeset.unique_constraint(:user_id)
    |> Repo.insert()
    |> handle_existing_user()
  end

  defp handle_existing_user({:ok, user}), do: user

  defp handle_existing_user({:error, %{data: %{user_id: user_id}}}) do
    Repo.get_by!(User, user_id: user_id)
  end

  @doc """
  Updates a document.

  ## Examples

      iex> update_document(document, %{field: new_value})
      {:ok, %Document{}}

      iex> update_document(document, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_document(%Document{} = document, attrs) do
    document
    |> Document.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Document.

  ## Examples

      iex> delete_document(document)
      {:ok, %Document{}}

      iex> delete_document(document)
      {:error, %Ecto.Changeset{}}

  """
  def delete_document(%Document{} = document) do
    Repo.delete(document)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking document changes.

  ## Examples

      iex> change_document(document)
      %Ecto.Changeset{source: %Document{}}

  """
  def change_document(%Document{} = document) do
    Document.changeset(document, %{})
  end
end
