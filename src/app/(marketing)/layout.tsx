import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
