import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import Header from '@/ui/header/header';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Nikki',
    description: 'My Judgemental Diary',
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ConfigProvider
                theme={{
                    token: {
                        colorFillSecondary: 'hsla(235, 30%, 80%, 40%)',
                        colorFillTertiary: 'hsla(235, 25%, 65%, 30%)',
                        colorTextQuaternary: 'var(--fg-reach)',
                        // antd doesn't work using a var here for some reason
                        colorPrimary: 'hsl(265, 50%, 50%)',
                    },
                }}
            >
                <AntdRegistry>
                    <body className={`${dmSans.className} min-h-screen flex flex-col items-center`}>
                        <Header />
                        {children}
                    </body>
                </AntdRegistry>
            </ConfigProvider>
        </html>
    );
}
