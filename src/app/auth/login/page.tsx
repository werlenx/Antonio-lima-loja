"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../auth.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha incorretos");
      } else {
        // Verificar se o usuário está logado
        const session = await getSession();
        if (session) {
          router.push("/"); // Redirecionar para a home
        }
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1>Entrar na Conta</h1>
          <p>Faça login para acessar sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Não tem uma conta?{" "}
            <Link href="/auth/register" className={styles.authLink}>
              Cadastre-se
            </Link>
          </p>
          <Link href="/auth/forgot-password" className={styles.authLink}>
            Esqueceu sua senha?
          </Link>
        </div>

        <div className={styles.demoCredentials}>
          <h3>Credenciais de Demonstração:</h3>
          <div className={styles.credentialItem}>
            <strong>Usuário:</strong> joao@exemplo.com / senha: password
          </div>
          <div className={styles.credentialItem}>
            <strong>Admin:</strong> admin@marcenaria.com / senha: password
          </div>
        </div>
      </div>
    </div>
  );
}
