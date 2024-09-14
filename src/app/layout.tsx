'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//代码高亮的样式
import 'highlight.js/styles/github-dark.min.css';
//数学公式样式
import 'katex/dist/katex.min.css'

//rightarea
import RightArea from "@/ui/rightArea";

//侧边栏
import SideBlock from "@/ui/side-block";

//store
import { Provider } from "react-redux";
import store from "@/redux-store/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en" className="w-screen h-screen">
        <head><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
        <body className={`${inter.className} flex`}>{/*设置为flex使子元素可以收缩*/}
          <SideBlock />
          <RightArea>{children}</RightArea>
        </body>
      </html>
    </Provider>
  );
}
