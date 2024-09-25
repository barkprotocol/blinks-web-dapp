import { NextResponse } from 'next/server'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // If the user is not logged in and trying to access a protected route,
    // they will be redirected to the login page by NextAuth automatically
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*']
}