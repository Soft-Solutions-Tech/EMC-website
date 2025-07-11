import { Header } from "./components/header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <Header />
        {children}
      </body>
    </html>
  );
}