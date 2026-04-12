import { useState, useRef, useCallback } from "react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, ShoppingBag, Sparkles, Check, RotateCcw, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import heic2any from "heic2any";

type Step = "upload" | "select" | "preview";

const processFile = async (file: File): Promise<string> => {
  let processedFile = file;

  // Convert HEIC/HEIF to JPEG
  if (file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif")) {
    toast.info("Converting HEIC image...");
    const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.85 });
    processedFile = new File(
      [Array.isArray(blob) ? blob[0] : blob],
      file.name.replace(/\.heic$/i, ".jpg").replace(/\.heif$/i, ".jpg"),
      { type: "image/jpeg" }
    );
  }

  // Resize if too large (max 1500px on longest side to keep base64 manageable)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const MAX = 1500;
        if (img.width <= MAX && img.height <= MAX) {
          resolve(dataUrl);
          return;
        }
        const scale = MAX / Math.max(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = dataUrl;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(processedFile);
  });
};

export default function VirtualTryOn() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [step, setStep] = useState<Step>("upload");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  const handleFile = async (file: File) => {
    setIsUploading(true);
    try {
      const dataUrl = await processFile(file);
      setUploadedImage(dataUrl);
      setStep("select");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Could not process this image. Please try a JPG or PNG file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    handleFile(file);
  }, []);

  const toggleItem = (product: Product) => {
    setSelectedItems((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const tryOnItems = products.filter((p) => p.tryOnAvailable);
  const totalPrice = selectedItems.reduce((s, p) => s + p.price, 0);

  const generateTryOn = async () => {
    if (!uploadedImage || selectedItems.length === 0) return;
    
    setIsGenerating(true);
    setError(null);
    setStep("preview");

    try {
      const clothingItems = selectedItems.map((p) => ({
        name: p.name,
        category: p.category,
        color: p.colors[0],
      }));

      const { data, error: fnError } = await supabase.functions.invoke("virtual-tryon", {
        body: { userImageBase64: uploadedImage, clothingItems },
      });

      if (fnError) throw new Error(fnError.message || "Failed to generate");
      if (data?.error) throw new Error(data.error);

      setGeneratedImage(data.generatedImage);
      toast.success("Your virtual try-on is ready!");
    } catch (err: any) {
      console.error("Try-on error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      toast.error("Failed to generate try-on image");
    } finally {
      setIsGenerating(false);
    }
  };

  const addAllToBag = () => {
    selectedItems.forEach((p) => {
      addItem(p, p.sizes[2] || p.sizes[0], p.colors[0]);
    });
    toast.success("All items added to bag!");
  };

  const reset = () => {
    setUploadedImage(null);
    setSelectedItems([]);
    setGeneratedImage(null);
    setError(null);
    setStep("upload");
  };

  return (
    <section id="try-on" className="py-24 bg-warm">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-accent">
              AI Virtual Try-On
            </span>
          </div>
          <h2 className="section-heading">See It On You</h2>
          <p className="font-body text-sm text-muted-foreground mt-3 tracking-wide max-w-lg mx-auto">
            Upload your photo, choose the clothes you love, and our AI will generate a realistic preview of how you'd look.
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {[
            { key: "upload", label: "Upload Photo", num: 1 },
            { key: "select", label: "Select Clothes", num: 2 },
            { key: "preview", label: "AI Preview", num: 3 },
          ].map(({ key, label, num }, i) => (
            <div key={key} className="flex items-center gap-3">
              {i > 0 && (
                <div className={`w-8 md:w-16 h-px ${
                  step === key || (step === "preview" && i <= 2) || (step === "select" && i <= 1)
                    ? "bg-accent" : "bg-border"
                }`} />
              )}
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body transition-colors ${
                  step === key
                    ? "bg-accent text-accent-foreground"
                    : (step === "preview" && num < 3) || (step === "select" && num < 2)
                    ? "bg-accent/20 text-accent"
                    : "bg-border text-muted-foreground"
                }`}>
                  {(step === "preview" && num < 3) || (step === "select" && num < 2)
                    ? <Check className="w-4 h-4" />
                    : num}
                </div>
                <span className="hidden md:inline font-body text-xs tracking-[0.1em] uppercase text-muted-foreground">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Upload */}
        {step === "upload" && (
          <div className="max-w-lg mx-auto animate-fade-in">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`aspect-[3/4] border-2 border-dashed border-border bg-background hover:border-accent cursor-pointer transition-colors flex flex-col items-center justify-center gap-4 group ${isUploading ? "pointer-events-none opacity-60" : ""}`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-accent animate-spin" />
                  <p className="font-body text-sm">Processing your image...</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <Upload className="w-7 h-7 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-body text-sm">Drop your photo here or click to upload</p>
                    <p className="font-body text-xs text-muted-foreground">
                      JPG, PNG, HEIC — full body photo works best
                    </p>
                  </div>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Step 2: Select clothes */}
        {step === "select" && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
              {/* Uploaded photo preview */}
              <div className="space-y-4">
                <div className="relative aspect-[3/4] bg-card overflow-hidden">
                  <img src={uploadedImage!} alt="Your photo" className="w-full h-full object-cover" />
                  <button
                    onClick={reset}
                    className="absolute top-3 right-3 p-2 bg-background/90 backdrop-blur-sm hover:bg-background transition-colors"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-body text-xs text-muted-foreground text-center">Your photo</p>
              </div>

              {/* Clothing selection */}
              <div className="space-y-4">
                <p className="font-body text-xs tracking-[0.15em] uppercase">
                  Select items to try on ({selectedItems.length} selected)
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tryOnItems.map((product) => {
                    const isSelected = selectedItems.find((p) => p.id === product.id);
                    return (
                      <button
                        key={product.id}
                        onClick={() => toggleItem(product)}
                        className={`relative text-left group transition-all ${isSelected ? "ring-2 ring-accent" : ""}`}
                      >
                        <div className="aspect-[3/4] bg-card overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-accent/10 flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                                <Check className="w-5 h-5 text-accent-foreground" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="pt-2">
                          <p className="font-body text-xs truncate">{product.name}</p>
                          <p className="font-body text-xs text-muted-foreground">${product.price}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedItems.length > 0 && (
                  <div className="pt-4">
                    <button onClick={generateTryOn} className="btn-fashion-accent w-full flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generate AI Try-On →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AI Preview */}
        {step === "preview" && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Generated image area */}
              <div className="space-y-4">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-center mb-2">
                  AI Generated Preview
                </p>

                {isGenerating && (
                  <div className="aspect-[3/4] bg-card border border-border flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                      <Sparkles className="w-6 h-6 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center space-y-2 px-8">
                      <p className="font-display text-lg">Creating Your Look...</p>
                      <p className="font-body text-xs text-muted-foreground">
                        Our AI is generating a realistic preview of you wearing the selected items. This may take 15-30 seconds.
                      </p>
                    </div>
                    <div className="w-48">
                      <div className="h-1 bg-border overflow-hidden rounded-full">
                        <div className="h-full bg-accent animate-pulse rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                  </div>
                )}

                {error && !isGenerating && (
                  <div className="aspect-[3/4] bg-card border border-destructive/30 flex flex-col items-center justify-center gap-4 px-8">
                    <AlertCircle className="w-12 h-12 text-destructive/60" />
                    <div className="text-center space-y-2">
                      <p className="font-display text-lg">Generation Failed</p>
                      <p className="font-body text-xs text-muted-foreground">{error}</p>
                    </div>
                    <button onClick={generateTryOn} className="btn-fashion-accent flex items-center gap-2 mt-2">
                      <RotateCcw className="w-4 h-4" />
                      Try Again
                    </button>
                  </div>
                )}

                {generatedImage && !isGenerating && (
                  <div className="space-y-4">
                    {/* Before / After */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground text-center">Before</p>
                        <div className="aspect-[3/4] bg-card overflow-hidden border border-border">
                          <img src={uploadedImage!} alt="Before" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-accent text-center">After — AI Generated</p>
                        <div className="aspect-[3/4] bg-card overflow-hidden border-2 border-accent">
                          <img src={generatedImage} alt="AI Generated Try-On" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Outfit details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-3xl font-light">Your Custom Look</h3>
                  <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                    {isGenerating
                      ? "Please wait while our AI creates your personalized try-on preview..."
                      : generatedImage
                      ? "Here's your AI-generated preview! See how the selected pieces look on you."
                      : "Something went wrong. Try again or select different items."}
                  </p>
                </div>

                {/* Selected items list */}
                <div className="space-y-3">
                  <p className="font-body text-xs tracking-[0.15em] uppercase">
                    Selected Items ({selectedItems.length})
                  </p>
                  {selectedItems.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-3 bg-background border border-border">
                      <img src={p.image} alt={p.name} className="w-14 h-18 object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm truncate">{p.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{p.category}</p>
                      </div>
                      <p className="font-body text-sm">${p.price}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="font-body text-xs tracking-[0.15em] uppercase">Total</span>
                    <span className="font-display text-2xl">${totalPrice}</span>
                  </div>

                  <button
                    onClick={addAllToBag}
                    disabled={isGenerating}
                    className="btn-fashion-accent w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add All to Bag
                  </button>
                  <button
                    onClick={() => { setGeneratedImage(null); setError(null); setStep("select"); }}
                    className="btn-fashion-outline w-full flex items-center justify-center gap-2"
                  >
                    Change Items
                  </button>
                  <button
                    onClick={reset}
                    className="w-full flex items-center justify-center gap-2 py-3 font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
