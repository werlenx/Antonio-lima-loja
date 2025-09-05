"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import CardProduct from "@/components/CardProduct";
import { productService } from "@/lib/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll({ limit: 20 });
        setProducts(response.products || []);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <Menu />
        <div className={styles.productsContainer}>
          <div className={styles.loading}>Carregando produtos...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Menu />
        <div className={styles.productsContainer}>
          <div className={styles.error}>Erro: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Menu />
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <CardProduct 
            key={product.id} 
            product={{
              id: product.id,
              name: product.nome,
              image: product.imagem_destaque || "/porta-mexicana01.webp",
              description: product.descricao || product.nome,
              price: product.preco.toFixed(2).replace('.', ','),
              priceNumber: product.preco,
              installment: `12x de ${(product.preco / 12).toFixed(2).replace('.', ',')}`,
            }}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
