import '@/styles/globals.css';
import { Jost, Playfair_Display, Satisfy } from 'next/font/google';
import Header from '@/components/Header';

// Import Swiper styles
import 'swiper/css';
import Footer from '@/components/Footer';
import ContactBar from '@/components/ContactBar';

/*Configure Google Fonts*/
const jost = Jost({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-jost'
})
const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair'
})
const satisfy = Satisfy({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-satisfy'
})

export default function RootLayout({
  children, params
}: {
  children: React.ReactNode,
  params: { lang: string }
}) {
  return (
    <html lang={params.lang} className={`${jost.variable} ${playfairDisplay.variable} ${satisfy.variable}`}>
      <body>
        <Header variant="transparent" />
        <main className="">
          {children}
        </main>
        <Footer />
        <ContactBar number="385912004400" />
      </body>
    </html >
  )
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'hr' }]
}