import "./globals.css";
import { Inter } from "next/font/google";
import { Onest } from 'next/font/google';
import Providers from "./providers";




const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "AutoPlaced-AI worked for your job prep and search",
  description: "Modern site using Inter font like Placed.today",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en" className={inter.variable}>
       <head>
        {/* Google Font: Poppins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
       <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
