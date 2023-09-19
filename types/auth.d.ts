interface RegisterUser {
  email: string,
  username: string,
  password: string
}

interface LoginUser {
  identifier: string,
  password: string
}

interface  AuthResponse {
  jwt: string,
  user: User
}

interface User {
  blocked: boolean,
  confirmed: boolean,
  createdAt: Date,
  id: number,
  username: string
  email: string
  updatedAt: Date,
  reviews: [],
  cart: Cart
}