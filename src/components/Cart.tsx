"use client";

import React, { useState } from 'react';
import { useCart, CartItem } from '@/contexts/CartContext';
import styles from './cart.module.css';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Aqui você pode integrar com sistema de pagamento
    setTimeout(() => {
      alert('Redirecionando para o checkout...');
      setIsCheckingOut(false);
    }, 1000);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />
      
      {/* Carrinho */}
      <div className={styles.cart}>
        <div className={styles.cartHeader}>
          <h2>Carrinho de Compras</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {state.items.length === 0 ? (
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <p>Seu carrinho está vazio</p>
            <span>Adicione produtos para começar suas compras</span>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {state.items.map((item) => (
                <div key={`${item.id}-${item.variation}-${JSON.stringify(item.customDimensions)}`} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    
                    {item.variation && (
                      <p className={styles.itemVariation}>Acabamento: {item.variation}</p>
                    )}
                    
                    {item.customDimensions && (
                      <p className={styles.itemDimensions}>
                        Medidas: {item.customDimensions.height} x {item.customDimensions.width} cm
                      </p>
                    )}
                    
                    <div className={styles.itemPrice}>
                      R$ {formatPrice(item.price)}
                    </div>
                  </div>
                  
                  <div className={styles.itemQuantity}>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      className={styles.quantityButton}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className={styles.itemTotal}>
                    R$ {formatPrice(item.price * item.quantity)}
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className={styles.removeButton}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartFooter}>
              <div className={styles.cartSummary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({state.itemCount} itens):</span>
                  <span>R$ {formatPrice(state.total)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Frete:</span>
                  <span>{state.total >= 500 ? 'Grátis' : 'R$ 29,90'}</span>
                </div>
                <div className={styles.summaryRowTotal}>
                  <span>Total:</span>
                  <span>R$ {formatPrice(state.total >= 500 ? state.total : state.total + 29.90)}</span>
                </div>
              </div>
              
              <div className={styles.cartActions}>
                <button
                  onClick={clearCart}
                  className={styles.clearCartButton}
                >
                  Limpar Carrinho
                </button>
                <button
                  onClick={handleCheckout}
                  className={styles.checkoutButton}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processando...' : 'Finalizar Compra'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
