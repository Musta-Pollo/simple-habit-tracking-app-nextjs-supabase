import Footer from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className=" flex flex-1">
        <Navbar />
      </div>
      {children}
      <Footer />
    </div>
  );
}
