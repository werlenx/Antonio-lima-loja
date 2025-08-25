"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../auth.module.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Por favor, insira seu email");
      setIsLoading(false);
      return;
    }

    try {
      // Simular envio de email (em produção, seria uma chamada para API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess("Email de recuperação enviado! Verifique sua caixa de entrada.");
      setEmail("");
    } catch (error) {
      setError("Erro ao enviar email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1>Recuperar Senha</h1>
          <p>Digite seu email para receber instruções de recuperação</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          {success && (
            <div className={styles.successMessage}>
              {success}
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

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Email de Recuperação"}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Lembrou sua senha?{" "}
            <Link href="/auth/login" className={styles.authLink}>
              Faça login
            </Link>
          </p>
          <p>
            Não tem uma conta?{" "}
            <Link href="/auth/register" className={styles.authLink}>
              Cadastre-se
            </Link>
          </p>
        </div>

        <div className={styles.helpInfo}>
          <h3>Como funciona?</h3>
          <ol>
            <li>Digite o email da sua conta</li>
            <li>Receba um link de recuperação</li>
            <li>Clique no link e crie uma nova senha</li>
            <li>Faça login com sua nova senha</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
