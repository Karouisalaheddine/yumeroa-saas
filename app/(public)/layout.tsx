import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col bg-white text-stone-900 font-sans">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <NewsletterPopup />
    </div>
  );
}
