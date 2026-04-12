import blackCoat from "@/assets/product-black-coat.jpg";
import whiteShirt from "@/assets/product-white-shirt.jpg";
import brownBag from "@/assets/product-brown-bag.jpg";
import graySweater from "@/assets/product-gray-sweater.jpg";
import blackTrousers from "@/assets/product-black-trousers.jpg";
import whiteSneakers from "@/assets/product-white-sneakers.jpg";
import brownScarf from "@/assets/product-brown-scarf.jpg";
import blackBelt from "@/assets/product-black-belt.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  tryOnAvailable: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Wool Overcoat",
    price: 495,
    category: "Outerwear",
    image: blackCoat,
    description: "A timeless black wool overcoat with clean lines and a modern silhouette. Perfect for layering over any outfit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    tryOnAvailable: true,
  },
  {
    id: "2",
    name: "Linen Classic Shirt",
    price: 165,
    category: "Tops",
    image: whiteShirt,
    description: "Crisp white linen shirt with a relaxed fit. A wardrobe essential that transitions effortlessly from day to night.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Cream"],
    tryOnAvailable: true,
  },
  {
    id: "3",
    name: "Leather Tote Bag",
    price: 385,
    category: "Accessories",
    image: brownBag,
    description: "Full-grain leather tote in rich cognac brown. Spacious interior with premium brass hardware.",
    sizes: ["One Size"],
    colors: ["Brown", "Black"],
    tryOnAvailable: false,
  },
  {
    id: "4",
    name: "Cashmere Sweater",
    price: 295,
    category: "Tops",
    image: graySweater,
    description: "Pure cashmere crew neck sweater in soft gray. Luxuriously soft with a relaxed, contemporary fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Gray", "Black", "White"],
    tryOnAvailable: true,
  },
  {
    id: "5",
    name: "Tailored Trousers",
    price: 225,
    category: "Bottoms",
    image: blackTrousers,
    description: "Slim-fit tailored trousers in black wool blend. High-waisted with pressed crease detailing.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    tryOnAvailable: true,
  },
  {
    id: "6",
    name: "Minimal Sneakers",
    price: 245,
    category: "Footwear",
    image: whiteSneakers,
    description: "Clean white leather sneakers with minimal branding. Premium Italian leather with rubber sole.",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: ["White"],
    tryOnAvailable: false,
  },
  {
    id: "7",
    name: "Wool Scarf",
    price: 125,
    category: "Accessories",
    image: brownScarf,
    description: "Oversized wool scarf in warm camel. Soft, lightweight, and perfect for layering.",
    sizes: ["One Size"],
    colors: ["Brown", "Gray"],
    tryOnAvailable: false,
  },
  {
    id: "8",
    name: "Leather Belt",
    price: 145,
    category: "Accessories",
    image: blackBelt,
    description: "Classic black leather belt with matte silver buckle. Handcrafted from full-grain leather.",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Brown"],
    tryOnAvailable: false,
  },
];

export const categories = ["All", "Outerwear", "Tops", "Bottoms", "Footwear", "Accessories"];
