import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { AdminProvider } from "@/context/AdminContext";

export const metadata = {
  title: "Aeroflux Electric - Premium Electronics",
  description: "Seasonal electronics and cooling/heating solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950">
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  );
}