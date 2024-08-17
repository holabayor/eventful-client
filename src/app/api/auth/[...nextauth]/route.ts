import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const response = await res.json();

        if (res.ok && response.data) {
          // Extract user and token data from response
          const user = {
            id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
            token: response.data.token, // Store token here
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.token; // Store the token in JWT
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      session.accessToken = token.accessToken; // Add the token to the session
      return session;
    },
    async signOut({ accessToken }: any) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!res.ok) {
        console.error('Failed to sign out');
      }
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
