import { Geist, Geist_Mono, Montserrat } from "next/font/google"
import localFont from "next/font/local"
import "@/styles/globals.css"
import { LangProvider } from "@/context/LangContext.js"
import Transition from "@/components/Transition.js"
import Navigation from "@/components/Navigation.js"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const aisling = localFont({
  src: "../../public/fonts/AislingFreeDemo.otf",
  variable: "--font-aisling",
})

const scotch = localFont({
  src: "../../public/fonts/ScotchDisplayCond.ttf",
  variable: "--font-scotch",
})

const sego = localFont({
  src: "../../public/fonts/SEGO.ttf",
  variable: "--font-SEGO",
})

const betterSaturday = localFont({
  src: "../../public/fonts/Better-Saturday.ttf",
  variable: "--font-betterSaturday",
})

export const metadata = {
  title: {
    default: "Portfolio Rifaldo Saputra",
    template: "%s | Portfolio Rifaldo Saputra",
  },
  description: "Portofolio pribadi saya, berisi tentang diri saya, karya saya, dan kontak saya.",
  keywords: [
    "nextjs",
    "website",
    "portfolio",
    "rifaldo",
    "saputra",
    "rifaldo saputra",
  ],
  authors: [{ name: "Rifaldo Saputra" }],
  creator: "Rifaldo Saputra",
  metadataBase: new URL("https://rifaldo.my.id"),

  openGraph: {
    title: "Portfolio Rifaldo Saputra",
    description: "Portofolio pribadi saya, berisi tentang diri saya, karya saya, dan kontak saya.",
    url: "https://rifaldo.my.id",
    siteName: "Portfolio Rifaldo Saputra",
    images: [
      {
        url: "/image/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Preview Portfolio Rifaldo Saputra",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio Rifaldo Saputra",
    description: "Portofolio pribadi saya, berisi tentang diri saya, karya saya, dan kontak saya.",
    images: ["/image/thumbnail.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${montserrat.variable}
        ${aisling.variable}
        ${scotch.variable}
        ${sego.variable}
        ${betterSaturday.variable}
      `}
    >
      <body>
        <LangProvider>
          <Transition>
            <Navigation />
            {children}
          </Transition>
        </LangProvider>
      </body>
    </html>
  )
}