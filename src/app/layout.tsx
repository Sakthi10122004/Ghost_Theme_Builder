import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
  title: "Ghost Theme Builder — Visual Theme Builder for Ghost CMS",
  description:
    "Design visually stunning Ghost CMS themes without writing code. Drag-and-drop components, customize everything, and download valid Ghost themes ready to upload.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
