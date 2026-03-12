import "./globals.css";

export const metadata = {
  title: "LIC Printing Shop",
  description: "Client Support System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
