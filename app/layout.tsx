import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "EMS Ops Explorer",
  description: "Operational dashboard for EMS leadership",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          maxWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
