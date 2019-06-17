defmodule Docify.Scalars.DateTime do
  use Absinthe.Schema.Notation

  scalar :datetime, name: "DateTime" do
    serialize(&DateTime.to_naive/1)
    parse(&parse_datetime/1)
  end

  defp parse_datetime(%Absinthe.Blueprint.Input.String{value: value}) do
    case DateTime.from_naive!(value, "Etc/UTC") do
      {:ok, datetime, 0} -> {:ok, datetime}
      {:ok, _datetime, _offset} -> :error
      _error -> :error
    end
  end

  defp parse_datetime(%Absinthe.Blueprint.Input.Null{}) do
    {:ok, nil}
  end

  defp parse_datetime(_) do
    :error
  end
end
