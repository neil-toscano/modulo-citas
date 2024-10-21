import localFont from "next/font/local";
import "./globals.css";
import { Providers} from "@/mantine/Provider";
import { ProductProvider } from "@/provider/ProviderContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Modulos de citas",
  description:
    "Plataforma de gestión de citas municipales que facilita el agendamiento de trámites en línea, ahorrando tiempo y evitando desplazamientos. Realiza tus trámites de manera rápida y eficiente desde cualquier lugar.",
    keywords:
    "gestión de citas municipales, agendamiento de trámites, trámites en línea, citas electrónicas, agendar cita online, trámites rápidos sin esperar, servicio municipal digital, plataforma de trámites, citas en línea, citas virtuales, trámites desde casa, agendar cita sin colas, municipio online, trámites en San Juan de Lurigancho, agendar trámites en línea, cita previa online, gestión digital de trámites, servicios municipales rápidos, trámites administrativos en línea",
  
  author: "san juan de lurigancho",
  category: "Trámites y Citas en Línea",
  charset: "UTF-8",
  colorScheme: "light",
  themeColor: "light",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",  // Mejor control sobre el zoom y el tamaño de la página en móviles

  canonical: "https://doona.com.pe", //url del sitio
  language: "es",
  hreflang: "es-pe",
  icons: {
    icon: "/favicon.icon",
  },
  robots: "index, follow", 
  og: {
    title: "Gestion de citas munisjl",
    description:
      "Plataforma de gestión de citas municipales que facilita el agendamiento de trámites en línea, ahorrando tiempo y evitando desplazamientos. Realiza tus trámites de manera rápida y eficiente desde cualquier lugar.",
    image: "/DonnaMovil.png",
    url: "https://doona.com.pe",
    type: "landing",
    locale: "es_PE",
    type: "website",
  },
};

// Check if the current route is the root

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ProductProvider>
            {/* <Header /> */}
            {children}
          </ProductProvider>
        </Providers>
      </body>
    </html>
  );
}
