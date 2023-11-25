import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import CustomThemeProvider from "./context/CustomThemeProvider";
import StyleProvider from "./context/StyleProvider";
import PlainCssPriorityProvider from "./context/PlainCssPriorityProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Activity Monitor",
  description: "Check your activities in any time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyleProvider>
          <PlainCssPriorityProvider>
            <CustomThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </CustomThemeProvider>
          </PlainCssPriorityProvider>
        </StyleProvider>
      </body>
    </html>
  );
}
