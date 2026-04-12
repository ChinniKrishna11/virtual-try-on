import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCollection from "@/components/ProductCollection";
import VirtualTryOn from "@/components/VirtualTryOn";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductCollection />
      <VirtualTryOn />
      <AboutSection />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
