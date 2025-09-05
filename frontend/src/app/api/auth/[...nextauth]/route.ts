import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/lib/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await authService.login(credentials.email, credentials.password);
          
          if (response.user) {
            return {
              id: response.user.id.toString(),
              email: response.user.email,
              name: response.user.nome,
              role: "user", // Por enquanto, todos são usuários comuns
            };
          }
          
          return null;
        } catch (error) {
          console.error('Erro na autenticação:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
  },
  secret: process.env.NEXTAUTH_SECRET || "antonio-lima-marcenaria-secret-key-2024",
});

export { handler as GET, handler as POST };
