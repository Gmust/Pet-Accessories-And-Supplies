import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    jwt: string;
    user: User;
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
    cart: Cart,
    jwt?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number,
    jwt: string
    user: User
  }
}


