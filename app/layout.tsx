import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Paolo Astrino - Project Manager & Full Stack Developer",
  description: "Project Manager & Full Stack Developer from Padova, Italy. Specializing in identifying problems and engineering high-impact solutions with AI-native speed.",
  icons: {
    icon: "/favicon-black.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://paoloastrino.github.io/#person",
        "name": "Paolo Astrino",
        "jobTitle": "Project Manager & Full Stack Developer",
        "url": "https://paoloastrino.github.io/",
        "image": "https://paoloastrino.github.io/placeholder-user.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Padova",
          "addressCountry": "IT"
        },
        "sameAs": [
          "https://github.com/paoloastrino",
          "https://www.linkedin.com/in/paolo-astrino-9792061a3"
        ],
        "knowsAbout": [
          "Python",
          "React",
          "Product Strategy",
          "Solution Architecture",
          "DevOps",
          "Full Stack Development",
          "Next.js"
        ],
        "description": "Technical Problem Solver & Builder focused on purposeful building and engineering high-impact solutions with AI-native speed."
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://paoloastrino.github.io/#business",
        "name": "Paolo Astrino",
        "url": "https://paoloastrino.github.io/",
        "image": "https://paoloastrino.github.io/placeholder-user.jpg",
        "founder": {
          "@id": "https://paoloastrino.github.io/#person"
        },
        "vatID": "IT05792580283",
        "email": "paolo.astrino@pec.it",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Padova",
          "addressRegion": "PD",
          "addressCountry": "IT"
        }
      }
    ]
  }

  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z54PYY1DNB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z54PYY1DNB');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
