export const saveToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) return null
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.user_id || payload.id || payload.sub
}
