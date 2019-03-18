defmodule Docify.Password do
  alias Argon2

  def hash(password), do: Argon2.hash_pwd_salt(password)

  def verify_hash(password, hash), do: Argon2.verify_pass(password, hash)

  def stub_verify, do: Argon2.no_user_verify()
end
