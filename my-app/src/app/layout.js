import { Header } from "./components/header";
import { Footer } from "./components/footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}