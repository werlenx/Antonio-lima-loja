"use client";

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/contexts/CartContext';
import Cart from './Cart';
import styles from './menu.module.css';
import Link from 'next/link';

const Menu = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { state } = useCart();
  const { data: session, status } = useSession();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <button className={styles.menuButton}>
            ☰
          </button>
          <div className={styles.logo}>
            <img src="/logo.png" alt="Logo" />
          </div>
          
          <div className={styles.rightSection}>
            <button className={styles.cartButton} onClick={openCart}>
              🛒
              {state.itemCount > 0 && (
                <span className={styles.cartBadge}>{state.itemCount}</span>
              )}
            </button>
            
            {status === 'loading' ? (
              <div className={styles.userLoading}>Carregando...</div>
            ) : session ? (
              <div className={styles.userSection}>
                <button className={styles.userButton} onClick={toggleUserMenu}>
                  <span className={styles.userAvatar}>
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  <span className={styles.userName}>{session.user?.name}</span>
                  <span className={styles.userArrow}>▼</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className={styles.userDropdown}>
                    <Link href="/perfil" className={styles.dropdownItem}>
                      👤 Meu Perfil
                    </Link>
                    <Link href="/pedidos" className={styles.dropdownItem}>
                      📦 Meus Pedidos
                    </Link>
                    <Link href="/enderecos" className={styles.dropdownItem}>
                      🏠 Meus Endereços
                    </Link>
                    <div className={styles.dropdownDivider}></div>
                    <button onClick={handleLogout} className={styles.dropdownItem}>
                      🚪 Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link href="/auth/login" className={styles.loginButton}>
                  Entrar
                </Link>
                <Link href="/auth/register" className={styles.registerButton}>
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            🔍
          </button>
        </div>
      </header>

      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Menu;
