import "../styles/globals.css"

export const metadata = {
  title: "Client Support System",
  description: "BIR Client Assistance Portal"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {children}

      </body>
    </html>
  )
}
