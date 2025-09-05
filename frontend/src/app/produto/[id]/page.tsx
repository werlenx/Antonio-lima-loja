"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { productService } from "@/lib/api";
import styles from "../product.module.css";

interface ProdutoPageProps {
  params: Promise<{ id: string }>;
}

interface ProductImage {
  id: number;
  src: string;
  alt: string;
  color?: string;
  material?: string;
}

interface ProductVariation {
  id: number;
  name: string;
  color: string;
  material: string;
  price: number;
}

interface ProductReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductFAQ {
  id: number;
  question: string;
  answer: string;
}

// Dados estáticos para especificações e FAQ (podem ser movidos para o banco futuramente)
const defaultSpecifications = {
  material: "Madeira Maciça",
  weight: "25kg",
  thickness: "4cm",
  height: "210cm",
  width: "80cm",
  warranty: "2 anos",
  features: ["Isolamento acústico", "Resistente à umidade", "Acabamento premium", "Fabricação artesanal"],
  hardware: ["Dobradiças de latão", "Fechadura com chave", "Puxador em madeira"]
};

const defaultFAQs = [
  { id: 1, question: "A porta vem com instalação inclusa?", answer: "Não, a instalação é cobrada separadamente. Oferecemos o serviço de instalação profissional." },
  { id: 2, question: "Posso personalizar as medidas?", answer: "Sim! Aceitamos pedidos personalizados com medidas específicas para seu projeto." },
  { id: 3, question: "Qual o prazo de entrega?", answer: "Para medidas padrão: 15-20 dias. Para medidas personalizadas: 25-30 dias úteis." },
  { id: 4, question: "A porta é resistente à umidade?", answer: "Sim, utilizamos tratamento especial para resistir à umidade, ideal para banheiros e áreas úmidas." }
];

export default function ProdutoPage({ params }: ProdutoPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [customDimensions, setCustomDimensions] = useState({ height: "", width: "" });
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showProfessionalForm, setShowProfessionalForm] = useState(false);
  const [showCustomOrderForm, setShowCustomOrderForm] = useState(false);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [productId, setProductId] = useState<string>("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem, isInCart } = useCart();

  // Extrair o ID do produto dos params e buscar dados
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        setProductId(resolvedParams.id);
        
        const productData = await productService.getById(resolvedParams.id);
        setProduct(productData);
      } catch (err) {
        console.error('Erro ao carregar produto:', err);
        setError('Produto não encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <div className={styles.notFound}>
        <h1>Carregando produto...</h1>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.notFound}>
        <h1>Produto não encontrado</h1>
        <Link href="/" className={styles.backLink}>
          Voltar para a Home
        </Link>
      </div>
    );
  }

  const currentVariation = product.variations?.[selectedVariation] || { nome: 'Padrão', preco: product.preco };
  const currentImage = product.images?.[selectedImage] || { src: "/porta-mexicana01.webp", alt: product.nome };
  const isProductInCart = isInCart(product.id, currentVariation.nome, customDimensions.height && customDimensions.width ? customDimensions : undefined);

  const handleWhatsAppContact = () => {
    const message = `Olá! Gostaria de saber mais sobre a ${product.nome}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.nome,
      price: currentVariation.preco,
      image: currentImage.src,
      quantity: quantity,
      variation: currentVariation.nome,
      customDimensions: customDimensions.height && customDimensions.width ? customDimensions : undefined,
    };

    addItem(cartItem);
    setShowAddToCartSuccess(true);
    
    setTimeout(() => {
      setShowAddToCartSuccess(false);
    }, 3000);
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
    // Resetar medidas personalizadas quando selecionar tamanho padrão
    if (size !== "custom") {
      setCustomDimensions({ height: "", width: "" });
    }
  };

  const isAddToCartDisabled = () => {
    if (selectedSize === "custom") {
      return !customDimensions.height || !customDimensions.width;
    }
    return !selectedSize;
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link> / <span>{product.nome}</span>
      </nav>

      <div className={styles.productGrid}>
        {/* Galeria de Imagens */}
        <div className={styles.gallerySection}>
          <div className={styles.mainImage}>
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={styles.mainImageImg}
            />
            <div className={styles.videoPlaceholder}>
              <div className={styles.videoIcon}>▶</div>
              <span>Vídeo do Produto</span>
            </div>
          </div>
          
          <div className={styles.thumbnailGrid}>
            {(product.images || []).map((image, index) => (
              <button
                key={image.id}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image.url} alt={image.alt || product.nome} />
              </button>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.nome}</h1>
          
          <div className={styles.priceSection}>
            <div className={styles.price}>R$ {currentVariation.preco.toFixed(2).replace('.', ',')}</div>
            <div className={styles.installment}>ou 12x de R$ {(currentVariation.preco / 12).toFixed(2).replace('.', ',')}</div>
          </div>

          <div className={styles.description}>
            <p>{product.descricao}</p>
          </div>

          {/* Variações de Cor e Material */}
          <div className={styles.variations}>
            <h3>Opções de Acabamento</h3>
            <div className={styles.variationOptions}>
              {(product.variations || []).map((variation, index) => (
                <button
                  key={variation.id}
                  className={`${styles.variationOption} ${selectedVariation === index ? styles.active : ''}`}
                  onClick={() => setSelectedVariation(index)}
                >
                  <span className={styles.variationName}>{variation.nome}</span>
                  <span className={styles.variationPrice}>R$ {(variation.preco + variation.preco_extra).toFixed(2).replace('.', ',')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Opções de Medidas */}
          <div className={styles.measurements}>
            <h3>Medidas Disponíveis</h3>
            <div className={styles.standardSizes}>
              <button 
                className={`${styles.sizeOption} ${selectedSize === "210x80" ? styles.active : ''}`}
                onClick={() => handleSizeSelection("210x80")}
              >
                210 x 80cm (Padrão)
              </button>
              <button 
                className={`${styles.sizeOption} ${selectedSize === "200x70" ? styles.active : ''}`}
                onClick={() => handleSizeSelection("200x70")}
              >
                200 x 70cm (Banheiro)
              </button>
              <button 
                className={`${styles.sizeOption} ${selectedSize === "220x90" ? styles.active : ''}`}
                onClick={() => handleSizeSelection("220x90")}
              >
                220 x 90cm (Quarto)
              </button>
              <button 
                className={`${styles.sizeOption} ${selectedSize === "custom" ? styles.active : ''}`}
                onClick={() => handleSizeSelection("custom")}
              >
                Medidas Personalizadas
              </button>
            </div>
            
            {selectedSize === "custom" && (
              <div className={styles.customSize}>
                <h4>Especifique as Medidas</h4>
                <div className={styles.dimensionInputs}>
                  <input
                    type="number"
                    placeholder="Altura (cm)"
                    value={customDimensions.height}
                    onChange={(e) => setCustomDimensions({...customDimensions, height: e.target.value})}
                  />
                  <span>x</span>
                  <input
                    type="number"
                    placeholder="Largura (cm)"
                    value={customDimensions.width}
                    onChange={(e) => setCustomDimensions({...customDimensions, width: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quantidade */}
          <div className={styles.quantitySection}>
            <h3>Quantidade</h3>
            <div className={styles.quantityControls}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={styles.quantityButton}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className={styles.actionButtons}>
            {!isProductInCart ? (
              <button 
                className={styles.addToCartButton} 
                onClick={handleAddToCart}
                disabled={isAddToCartDisabled()}
              >
                🛒 Adicionar ao Carrinho
              </button>
            ) : (
              <div className={styles.inCartMessage}>
                ✅ Produto já está no carrinho
              </div>
            )}
            
            <button className={styles.primaryButton} onClick={() => setShowCustomOrderForm(true)}>
              Pedido Personalizado
            </button>
            <button className={styles.secondaryButton} onClick={() => setShowProfessionalForm(true)}>
              Pedir um Profissional
            </button>
            <button className={styles.whatsappButton} onClick={handleWhatsAppContact}>
              WhatsApp
            </button>
          </div>

          {/* Mensagem de sucesso */}
          {showAddToCartSuccess && (
            <div className={styles.successMessage}>
              ✅ Produto adicionado ao carrinho com sucesso!
            </div>
          )}
        </div>
      </div>

      {/* Ficha Técnica */}
      <section className={styles.specifications}>
        <h2>Ficha Técnica</h2>
        <div className={styles.specsGrid}>
          <div className={styles.specItem}>
            <strong>Material:</strong> {defaultSpecifications.material}
          </div>
          <div className={styles.specItem}>
            <strong>Peso:</strong> {defaultSpecifications.weight}
          </div>
          <div className={styles.specItem}>
            <strong>Espessura:</strong> {defaultSpecifications.thickness}
          </div>
          <div className={styles.specItem}>
            <strong>Altura:</strong> {defaultSpecifications.height}
          </div>
          <div className={styles.specItem}>
            <strong>Largura:</strong> {defaultSpecifications.width}
          </div>
          <div className={styles.specItem}>
            <strong>Garantia:</strong> {defaultSpecifications.warranty}
          </div>
        </div>
        
        <div className={styles.features}>
          <h3>Características Especiais</h3>
          <ul>
            {defaultSpecifications.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className={styles.hardware}>
          <h3>Ferragens Inclusas</h3>
          <ul>
            {defaultSpecifications.hardware.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avaliações */}
      <section className={styles.reviews}>
        <h2>Avaliações dos Clientes</h2>
        <div className={styles.reviewsGrid}>
          {(product.reviews || []).map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewerName}>{review.usuario_nome}</span>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.nota ? styles.star : styles.starEmpty}>★</span>
                  ))}
                </div>
              </div>
              <p className={styles.reviewComment}>{review.comentario}</p>
              <span className={styles.reviewDate}>{new Date(review.criado_em).toLocaleDateString('pt-BR')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2>Perguntas Frequentes</h2>
        <div className={styles.faqList}>
          {defaultFAQs.map((faq) => (
            <details key={faq.id} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.question}</summary>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Informações de Logística */}
      <section className={styles.logistics}>
        <h2>Informações de Entrega e Políticas</h2>
        <div className={styles.logisticsGrid}>
          <div className={styles.logisticsItem}>
            <h3>Frete e Entrega</h3>
            <p>Frete grátis para compras acima de R$ 500,00. Prazo de entrega: 15-30 dias úteis dependendo da região.</p>
          </div>
          <div className={styles.logisticsItem}>
            <h3>Troca e Devolução</h3>
            <p>7 dias para troca ou devolução. Produto deve estar em perfeito estado e na embalagem original.</p>
          </div>
          <div className={styles.logisticsItem}>
            <h3>Garantia</h3>
            <p>2 anos de garantia contra defeitos de fabricação. Cobertura completa de reparos e substituição.</p>
          </div>
        </div>
      </section>

      {/* Formulários Modais */}
      {showContactForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Entre em Contato</h3>
            <form className={styles.contactForm}>
              <input type="text" placeholder="Nome completo" required />
              <input type="email" placeholder="E-mail" required />
              <input type="tel" placeholder="Telefone" required />
              <textarea placeholder="Mensagem" rows={4} required></textarea>
              <div className={styles.modalButtons}>
                <button type="submit">Enviar</button>
                <button type="button" onClick={() => setShowContactForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProfessionalForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Agendar Visita Técnica</h3>
            <form className={styles.professionalForm}>
              <input type="text" placeholder="Nome completo" required />
              <input type="email" placeholder="E-mail" required />
              <input type="tel" placeholder="Telefone" required />
              <input type="text" placeholder="Endereço" required />
              <input type="date" placeholder="Data preferida" required />
              <textarea placeholder="Observações" rows={4}></textarea>
              <div className={styles.modalButtons}>
                <button type="submit">Agendar</button>
                <button type="button" onClick={() => setShowProfessionalForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCustomOrderForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Pedido Personalizado</h3>
            <form className={styles.customOrderForm}>
              <input type="text" placeholder="Nome completo" required />
              <input type="email" placeholder="E-mail" required />
              <input type="tel" placeholder="Telefone" required />
              <div className={styles.dimensionInputs}>
                <input type="number" placeholder="Altura (cm)" required />
                <span>x</span>
                <input type="number" placeholder="Largura (cm)" required />
              </div>
              <textarea placeholder="Especificações especiais" rows={4}></textarea>
              <div className={styles.modalButtons}>
                <button type="submit">Solicitar Orçamento</button>
                <button type="button" onClick={() => setShowCustomOrderForm(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Link href="/" className={styles.backLink}>
        ← Voltar para a Home
      </Link>
    </div>
  );
}
