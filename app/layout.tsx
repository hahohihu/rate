import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import Header from '@/ui/header/header';
import COLORS from '@/ui/color';
import { CSSProperties } from 'react';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Nikki',
    description: 'My Judgemental Diary',
};

interface CSSVars extends CSSProperties {
    [key: `--${string}`]: string | number
}

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    let css: CSSVars = {};
    for (const [key, value] of Object.entries(COLORS)) {
        css[`--color-${key}`] = value;
    }
    return (
        <html lang="en" style={css}>
            <ConfigProvider
                theme={{
                    token: {
                        colorFillSecondary: COLORS.fly,
                        colorFillTertiary: COLORS.middle,
                        colorTextQuaternary: COLORS.reach,
                        colorPrimary: COLORS.brand,
                        colorBgBase: COLORS.fly,
                        colorText: COLORS.ordinary
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
