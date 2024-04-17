import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
        <div>
            
                <Link href="/">Home</Link>
                <Link href="/">Home</Link>
                <Link href="/">Home</Link>
                <Link href="/">Home</Link>
                <Link href="/">Home</Link>
            
        </div>
     {children}
     
    </div>
  );
}
