export const metadata = {
  title: "EMS Ops Explorer",
  description: "Operational EMS dashboard prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
