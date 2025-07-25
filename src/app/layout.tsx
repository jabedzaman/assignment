import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Header } from "~/components/header";
import { Bricolage_Grotesque } from "next/font/google";

export const metadata: Metadata = {
  title: "CANVAS LMS - Clone",
};

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.className} antialiased`}>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 bg-gray-50">
              <Header />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
