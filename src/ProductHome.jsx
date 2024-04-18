import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"

export const ProductHome = () => {
  return (
    <>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </>
  )
}


