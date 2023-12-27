import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer/footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'LeetCode Clone',
  description: 'Created by Ayan Saha',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  )
}
