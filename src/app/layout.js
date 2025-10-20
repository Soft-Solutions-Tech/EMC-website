import { Suspense } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import "./globals.css";

export const metadata = {
  title: "EMC Consulting",
  description:
    "EMC is a leading consulting firm specializing in business solutions, strategic planning, and operational excellence. We help organizations achieve their goals through innovative approaches and proven methodologies.",
};

const isUnderConstruction = process.env.UNDER_CONSTRUCTION === "true";

function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Website Under Construction</h1>
      <p className="text-lg text-gray-600">
        We&apos;re working hard to bring you a better experience. Please check
        back soon!
      </p>
    </div>
  );
}

export default function RootLayout({ children }) {
  if (isUnderConstruction) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </head>
        <body>
          <UnderConstruction />
        </body>
      </html>
    );
  }

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
