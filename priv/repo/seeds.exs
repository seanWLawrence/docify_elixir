# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Docify.Repo.insert!(%Docify.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Docify.Accounts.User
alias Docify.Repo

%User{email: "test@test.com"} |> Repo.insert!

%User{email: "hello@world.com"} |> Repo.insert!
