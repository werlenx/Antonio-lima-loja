"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import styles from "./perfil.module.css";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("perfil");

  // Redirecionar se não estiver logado
  if (status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Meu Perfil</h1>
        <p>Gerencie suas informações pessoais e acompanhe seus pedidos</p>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <nav className={styles.navigation}>
            <button
              className={`${styles.navItem} ${activeTab === "perfil" ? styles.active : ""}`}
              onClick={() => setActiveTab("perfil")}
            >
              👤 Informações Pessoais
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "pedidos" ? styles.active : ""}`}
              onClick={() => setActiveTab("pedidos")}
            >
              📦 Meus Pedidos
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "enderecos" ? styles.active : ""}`}
              onClick={() => setActiveTab("enderecos")}
            >
              🏠 Meus Endereços
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "favoritos" ? styles.active : ""}`}
              onClick={() => setActiveTab("favoritos")}
            >
              ❤️ Favoritos
            </button>
            <button
              className={`${styles.navItem} ${activeTab === "configuracoes" ? styles.active : ""}`}
              onClick={() => setActiveTab("configuracoes")}
            >
              ⚙️ Configurações
            </button>
          </nav>
        </div>

        <div className={styles.mainContent}>
          {activeTab === "perfil" && (
            <div className={styles.tabContent}>
              <h2>Informações Pessoais</h2>
              <div className={styles.profileInfo}>
                <div className={styles.avatarSection}>
                  <div className={styles.avatar}>
                    {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <button className={styles.changeAvatarButton}>
                    Alterar Foto
                  </button>
                </div>
                
                <div className={styles.infoForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Nome Completo</label>
                      <input
                        type="text"
                        defaultValue={session?.user?.name || ""}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input
                        type="email"
                        defaultValue={session?.user?.email || ""}
                        placeholder="seu@email.com"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Telefone</label>
                      <input
                        type="tel"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>CPF</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Data de Nascimento</label>
                      <input
                        type="date"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Gênero</label>
                      <select>
                        <option value="">Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                        <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formActions}>
                    <button className={styles.saveButton}>
                      Salvar Alterações
                    </button>
                    <button className={styles.cancelButton}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pedidos" && (
            <div className={styles.tabContent}>
              <h2>Meus Pedidos</h2>
              <div className={styles.ordersList}>
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📦</div>
                  <h3>Nenhum pedido encontrado</h3>
                  <p>Você ainda não fez nenhum pedido. Que tal começar agora?</p>
                  <Link href="/" className={styles.shopButton}>
                    Ver Produtos
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "enderecos" && (
            <div className={styles.tabContent}>
              <h2>Meus Endereços</h2>
              <div className={styles.addressesList}>
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🏠</div>
                  <h3>Nenhum endereço cadastrado</h3>
                  <p>Adicione endereços para facilitar suas compras</p>
                  <button className={styles.addAddressButton}>
                    + Adicionar Endereço
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "favoritos" && (
            <div className={styles.tabContent}>
              <h2>Meus Favoritos</h2>
              <div className={styles.favoritesList}>
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>❤️</div>
                  <h3>Nenhum favorito</h3>
                  <p>Adicione produtos aos favoritos para encontrá-los facilmente</p>
                  <Link href="/" className={styles.shopButton}>
                    Ver Produtos
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "configuracoes" && (
            <div className={styles.tabContent}>
              <h2>Configurações</h2>
              <div className={styles.settingsList}>
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Notificações por Email</h3>
                    <p>Receba atualizações sobre seus pedidos e promoções</p>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Notificações por SMS</h3>
                    <p>Receba mensagens de texto sobre seus pedidos</p>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <h3>Newsletter</h3>
                    <p>Receba novidades e ofertas exclusivas</p>
                  </div>
                  <label className={styles.toggleSwitch}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
