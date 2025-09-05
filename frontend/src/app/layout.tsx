import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Antonio Lima Marcenaria - Portas Artesanais",
  description: "Portas artesanais de madeira maciça com design único e qualidade premium. Fabricação artesanal com acabamento refinado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
