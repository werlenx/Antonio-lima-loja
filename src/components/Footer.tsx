'use client';
import React from 'react';
import styles from './footer.module.css';

// Definição do tipo para os itens do rodapé
interface FooterSectionProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, description, buttonText, onClick }) => (
  <div className={styles.footerSection}>
    <h3>{title}</h3>
    <p>{description}</p>
    <button className={styles.footerButton} onClick={onClick}>
      {buttonText}
    </button>
  </div>
);

const Footer: React.FC = () => {
  const handleRequestQuote = () => {
    console.log('Solicitar orçamento');
  };

  const handleRequestProfessional = () => {
    console.log('Chamar um profissional');
  };

  const handleContactUs = () => {
    console.log('Entrar em contato');
  };

  return (
    <footer className={styles.footerContainer}>
      <FooterSection
        title="Peça seu Orçamento"
        description="Solicite um orçamento personalizado de acordo com as suas necessidades. Nossa equipe está pronta para atender você."
        buttonText="Solicitar Orçamento"
        onClick={handleRequestQuote}
      />
      <FooterSection
        title="Solicite um Profissional"
        description="Precisa de ajuda para tirar medidas precisas? Solicite a visita de um profissional especializado."
        buttonText="Chamar um Profissional"
        onClick={handleRequestProfessional}
      />
      <FooterSection
        title="Entre em Contato Conosco"
        description="Tem alguma dúvida ou deseja mais informações? Fale diretamente com nossa equipe."
        buttonText="Falar Conosco"
        onClick={handleContactUs}
      />
      <div className={styles.footerBottom}>
        <p>© 2024 Antonio Lima Marcenaria - Todos os direitos reservados | Portas e Portais em Mojku</p>
        <p>Desenvolvido por <a href="#">Mooncake Web Solutions</a></p>
      </div>
    </footer>
  );
};

export default Footer;
