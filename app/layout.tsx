import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/layout/Sidebar';
import Theme from '@/components/layout/Theme';
import Wrapper from '@/components/layout/Wrapper';
import { Providers } from './redux/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Open Keep',
  description: 'Open source notes & reminders app',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Theme>
            <div className="flex">
              <Sidebar />
              <Wrapper>
                {children}
              </Wrapper>
            </div>
          </Theme>
        </Providers>
      </body>
    </html>
  )
}
