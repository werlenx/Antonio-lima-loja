"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
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

const products = [
  {
    id: 1,
    name: "Porta de Madeira Maciça Estilo Mexicana #01",
    description: "Porta artesanal de madeira maciça com design único inspirado na arquitetura mexicana. Fabricada com madeira de lei selecionada e acabamento premium.",
    price: 299.99,
    installment: "12x de R$ 29,99",
    images: [
      { id: 1, src: "/porta-mexicana01.webp", alt: "Porta Mexicana - Vista Frontal", color: "natural", material: "mogno" },
      { id: 2, src: "/porta-mexicana02.png", alt: "Porta Mexicana - Vista Lateral", color: "natural", material: "mogno" },
      { id: 3, src: "/porta-mexicana01.webp", alt: "Porta Mexicana - Detalhe", color: "natural", material: "mogno" },
    ],
    variations: [
      { id: 1, name: "Natural", color: "Natural", material: "Mogno", price: 299.99 },
      { id: 2, name: "Encerado", color: "Encerado", material: "Mogno", price: 349.99 },
      { id: 3, name: "Vernizado", color: "Vernizado", material: "Mogno", price: 379.99 },
    ],
    specifications: {
      material: "Madeira Maciça de Mogno",
      weight: "25kg",
      thickness: "4cm",
      height: "210cm",
      width: "80cm",
      warranty: "2 anos",
      features: ["Isolamento acústico", "Resistente à umidade", "Acabamento premium", "Fabricação artesanal"],
      hardware: ["Dobradiças de latão", "Fechadura com chave", "Puxador em madeira"]
    },
    reviews: [
      { id: 1, name: "Maria Silva", rating: 5, comment: "Porta linda e de excelente qualidade! Superou minhas expectativas.", date: "15/01/2024" },
      { id: 2, name: "João Santos", rating: 5, comment: "Acabamento perfeito e instalação foi muito bem feita.", date: "10/01/2024" },
      { id: 3, name: "Ana Costa", rating: 4, comment: "Muito bonita, só demorou um pouco mais para chegar.", date: "05/01/2024" }
    ],
    faqs: [
      { id: 1, question: "A porta vem com instalação inclusa?", answer: "Não, a instalação é cobrada separadamente. Oferecemos o serviço de instalação profissional." },
      { id: 2, question: "Posso personalizar as medidas?", answer: "Sim! Aceitamos pedidos personalizados com medidas específicas para seu projeto." },
      { id: 3, question: "Qual o prazo de entrega?", answer: "Para medidas padrão: 15-20 dias. Para medidas personalizadas: 25-30 dias úteis." },
      { id: 4, question: "A porta é resistente à umidade?", answer: "Sim, utilizamos tratamento especial para resistir à umidade, ideal para banheiros e áreas úmidas." }
    ]
  },
  {
    id: 2,
    name: "Porta de Madeira Maciça Estilo Mexicana #02",
    description: "Porta artesanal com design contemporâneo e acabamento refinado. Perfeita para ambientes modernos que buscam sofisticação.",
    price: 199.99,
    installment: "6x de R$ 33,33",
    images: [
      { id: 1, src: "/porta-mexicana02.png", alt: "Porta Mexicana #02 - Vista Frontal", color: "natural", material: "cedro" },
      { id: 2, src: "/porta-mexicana01.webp", alt: "Porta Mexicana #02 - Vista Lateral", color: "natural", material: "cedro" },
      { id: 3, src: "/porta-mexicana02.png", alt: "Porta Mexicana #02 - Detalhe", color: "natural", material: "cedro" },
    ],
    variations: [
      { id: 1, name: "Natural", color: "Natural", material: "Cedro", price: 199.99 },
      { id: 2, name: "Encerado", color: "Encerado", material: "Cedro", price: 249.99 },
    ],
    specifications: {
      material: "Madeira Maciça de Cedro",
      weight: "22kg",
      thickness: "3.5cm",
      height: "210cm",
      width: "80cm",
      warranty: "2 anos",
      features: ["Leve e durável", "Resistente a pragas", "Acabamento suave", "Design contemporâneo"],
      hardware: ["Dobradiças de aço", "Fechadura simples", "Puxador em madeira"]
    },
    reviews: [
      { id: 1, name: "Carlos Lima", rating: 5, comment: "Porta muito bonita e de boa qualidade pelo preço.", date: "20/01/2024" },
      { id: 2, name: "Lucia Ferreira", rating: 4, comment: "Gostei muito do acabamento e da cor natural.", date: "18/01/2024" }
    ],
    faqs: [
      { id: 1, question: "A porta vem com instalação inclusa?", answer: "Não, a instalação é cobrada separadamente. Oferecemos o serviço de instalação profissional." },
      { id: 2, question: "Posso personalizar as medidas?", answer: "Sim! Aceitamos pedidos personalizados com medidas específicas para seu projeto." },
      { id: 3, question: "Qual o prazo de entrega?", answer: "Para medidas padrão: 15-20 dias. Para medidas personalizadas: 25-30 dias úteis." }
    ]
  }
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

  const { addItem, isInCart } = useCart();

  // Extrair o ID do produto dos params
  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Produto não encontrado</h1>
        <Link href="/" className={styles.backLink}>
          Voltar para a Home
        </Link>
      </div>
    );
  }

  const currentVariation = product.variations[selectedVariation];
  const currentImage = product.images[selectedImage];
  const isProductInCart = isInCart(product.id, currentVariation.name, customDimensions.height && customDimensions.width ? customDimensions : undefined);

  const handleWhatsAppContact = () => {
    const message = `Olá! Gostaria de saber mais sobre a ${product.name}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentVariation.price,
      image: currentImage.src,
      quantity: quantity,
      variation: currentVariation.name,
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
        <Link href="/">Home</Link> / <span>{product.name}</span>
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
            {product.images.map((image, index) => (
              <button
                key={image.id}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image.src} alt={image.alt} />
              </button>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          
          <div className={styles.priceSection}>
            <div className={styles.price}>R$ {currentVariation.price.toFixed(2).replace('.', ',')}</div>
            <div className={styles.installment}>ou {product.installment}</div>
          </div>

          <div className={styles.description}>
            <p>{product.description}</p>
          </div>

          {/* Variações de Cor e Material */}
          <div className={styles.variations}>
            <h3>Opções de Acabamento</h3>
            <div className={styles.variationOptions}>
              {product.variations.map((variation, index) => (
                <button
                  key={variation.id}
                  className={`${styles.variationOption} ${selectedVariation === index ? styles.active : ''}`}
                  onClick={() => setSelectedVariation(index)}
                >
                  <span className={styles.variationName}>{variation.name}</span>
                  <span className={styles.variationPrice}>R$ {variation.price.toFixed(2).replace('.', ',')}</span>
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
            <strong>Material:</strong> {product.specifications.material}
          </div>
          <div className={styles.specItem}>
            <strong>Peso:</strong> {product.specifications.weight}
          </div>
          <div className={styles.specItem}>
            <strong>Espessura:</strong> {product.specifications.thickness}
          </div>
          <div className={styles.specItem}>
            <strong>Altura:</strong> {product.specifications.height}
          </div>
          <div className={styles.specItem}>
            <strong>Largura:</strong> {product.specifications.width}
          </div>
          <div className={styles.specItem}>
            <strong>Garantia:</strong> {product.specifications.warranty}
          </div>
        </div>
        
        <div className={styles.features}>
          <h3>Características Especiais</h3>
          <ul>
            {product.specifications.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className={styles.hardware}>
          <h3>Ferragens Inclusas</h3>
          <ul>
            {product.specifications.hardware.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avaliações */}
      <section className={styles.reviews}>
        <h2>Avaliações dos Clientes</h2>
        <div className={styles.reviewsGrid}>
          {product.reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewerName}>{review.name}</span>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? styles.star : styles.starEmpty}>★</span>
                  ))}
                </div>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
              <span className={styles.reviewDate}>{review.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <h2>Perguntas Frequentes</h2>
        <div className={styles.faqList}>
          {product.faqs.map((faq) => (
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
