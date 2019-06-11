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
alias Docify.Password

%User{email: "test@test.com", password_hash: Password.hash("test1234")} |> Repo.insert!()

%User{email: "hello@world.com", password_hash: Password.hash("helloworld")} |> Repo.insert!()
