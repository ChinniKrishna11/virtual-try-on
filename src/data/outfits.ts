import tryonLook1 from "@/assets/tryon-look1.jpg";
import tryonLook2 from "@/assets/tryon-look2.jpg";
import tryonLook3 from "@/assets/tryon-look3.jpg";

export type Outfit = {
  id: string;
  name: string;
  image: string;
  productIds: string[];
  description: string;
};

export const outfits: Outfit[] = [
  {
    id: "o1",
    name: "Classic Noir",
    image: tryonLook1,
    productIds: ["1", "2", "5"],
    description: "Black wool coat paired with a crisp white shirt and tailored trousers. A timeless combination for any occasion.",
  },
  {
    id: "o2",
    name: "Casual Elegance",
    image: tryonLook2,
    productIds: ["4", "5", "6"],
    description: "Gray cashmere sweater with black trousers and minimal white sneakers. Effortlessly chic comfort.",
  },
  {
    id: "o3",
    name: "Autumn Layer",
    image: tryonLook3,
    productIds: ["2", "7", "5"],
    description: "White linen shirt layered with a warm brown scarf and black trousers. Perfect for transitional weather.",
  },
];
