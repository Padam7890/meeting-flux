import Sidebar from "../_components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={" antialiased"}>
      <div className="flex min-h-screen bg-white">
          {/* Fixed sidebar */}
          <aside className="w-64 fixed top-0 left-0 h-full bg-white shadow-md z-10 overflow-hidden">
            <Sidebar />
          </aside>

          {/* Content area with left margin to match sidebar width */}
          <main className="ml-64 flex-1 p-6  overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
