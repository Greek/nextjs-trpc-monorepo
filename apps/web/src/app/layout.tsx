import { TRPCProviders } from "@/utils/trpc/query-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCProviders>{children}</TRPCProviders>
      </body>
    </html>
  );
}
