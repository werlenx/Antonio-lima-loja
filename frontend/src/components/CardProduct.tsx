"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import styles from './cardProduct.module.css';

// Definição do tipo para os produtos
interface Product {
  id: number;
  image: string;
  description: string;
  price: string;
  installment: string;
  name: string;
  priceNumber: number;
}

interface CardProductProps {
  product: Product;
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne a navegação para a página do produto
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    const cartItem = {
      id: product.id,
      name: product.name || product.description,
      price: product.priceNumber || parseFloat(product.price.replace(',', '.')),
      image: product.image,
      quantity: 1,
    };

    addItem(cartItem);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const isInCartProduct = isInCart(product.id);

  return (
    <div className={styles.cardContainer}>
      <Link href={`/produto/${product.id}`} className={styles.card}>
        <img className={styles.productImage} src={product.image} alt={product.description} />
        <div className={styles.productDetails}>
          <h2 className={styles.productDescription}>{product.description}</h2>
          <div className={styles.productPrice}>
            <span className={styles.price}>R$ {product.price}</span>
            <span className={styles.installment}>ou {product.installment}</span>
          </div>
        </div>
      </Link>
      
      <div className={styles.cardActions}>
        {!isInCartProduct ? (
          <button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? '✓ Adicionado!' : '🛒 Adicionar ao Carrinho'}
          </button>
        ) : (
          <div className={styles.inCartIndicator}>
            ✅ No Carrinho
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
