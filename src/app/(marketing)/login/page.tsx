import { Metadata } from "next"
import Link from "next/link"

import { UserAuthForm } from "@/components/user-login"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Logar na sua conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Entre com seus dados de Login
        </p>
      </div>

      <UserAuthForm />
    </>
  )
}
