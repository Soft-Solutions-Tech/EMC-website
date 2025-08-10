import { Suspense } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import "./globals.css";

export const metadata = {
  title: "EMC Consulting",
  description:
    "EMC is a leading consulting firm specializing in business solutions, strategic planning, and operational excellence. We help organizations achieve their goals through innovative approaches and proven methodologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="m-0 p-0 min-h-screen flex flex-col">
        <Suspense fallback={<div className="h-16 bg-white/60"></div>}>
          <Header />
        </Suspense>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}