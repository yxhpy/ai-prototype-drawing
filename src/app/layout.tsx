import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { FiHome, FiGithub } from "react-icons/fi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "产品原型展示平台",
  description: "浏览和查看各种产品的原型设计",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex justify-between items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                <FiHome className="text-blue-500" />
                <span>产品原型展示平台</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  首页
                </Link>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-1"
                >
                  <FiGithub />
                  <span>GitHub</span>
                </a>
              </div>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t mt-auto py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">产品原型展示平台</h3>
                <p className="text-gray-600">展示您的设计和创意，让团队更好地协作</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">快速链接</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-600 hover:text-blue-600">首页</Link></li>
                  <li><Link href="/projects/project-1" className="text-gray-600 hover:text-blue-600">示例项目</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">联系我们</h3>
                <p className="text-gray-600">有任何问题或建议，请随时联系我们</p>
                <a href="mailto:contact@example.com" className="text-blue-600 hover:underline mt-2 inline-block">
                  contact@example.com
                </a>
              </div>
            </div>
            <div className="border-t mt-8 pt-6 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} 产品原型展示平台 - 版权所有
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
