import styles from "./page.module.css";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import CardProduct from "@/components/CardProduct";

const products = [
  {
    id: 1,
    name: "Porta de Madeira Maciça Estilo Mexicana #01",
    image: "/porta-mexicana01.webp",
    description: "Porta de Madeira Maciça estilo mexicana #01",
    price: "299,99",
    priceNumber: 299.99,
    installment: "12x de 29,99",
  },
  {
    id: 2,
    name: "Porta de Madeira Maciça Estilo Mexicana #02",
    image: "/porta-mexicana02.png",
    description: "Porta de Madeira Maciça estilo mexicana #02",
    price: "199,99",
    priceNumber: 199.99,
    installment: "6x de 33,33",
  },
  {
    id: 3,
    name: "Porta de Madeira Maciça Estilo Mexicana #03",
    image: "/porta-mexicana02.png",
    description: "Porta de Madeira Maciça estilo mexicana #03",
    price: "199,99",
    priceNumber: 199.99,
    installment: "6x de 33,33",
  },
  {
    id: 4,
    name: "Porta de Madeira Maciça Estilo Mexicana #04",
    image: "/porta-mexicana02.png",
    description: "Porta de Madeira Maciça estilo mexicana #04",
    price: "199,99",
    priceNumber: 199.99,
    installment: "6x de 33,33",
  },
  {
    id: 5,
    name: "Porta de Madeira Maciça Estilo Mexicana #05",
    image: "/porta-mexicana02.png",
    description: "Porta de Madeira Maciça estilo mexicana #05",
    price: "199,99",
    priceNumber: 199.99,
    installment: "6x de 33,33",
  },
];

export default function Home() {
  return (
    <>
      <Menu />
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </>
  );
}
