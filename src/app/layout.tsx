
import poppins from '@/fonts';
import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
