const validatedLogin = (username: string, password: string) => {
  const regexUsername = /^[a-z][^\W_]{7,14}$/i
  const regexPassword = /^(?=[^a-z]*[a-z])(?=\D*\d)[^:&.~\s]{8,20}$/
  if (regexUsername.test(username) && regexPassword.test(password)) return true
  return false
}

export { validatedLogin }
