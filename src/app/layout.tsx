import "./globals.css";
import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { ApolloWrapper } from "../lib/apollo-wrapper";

const prompt = Prompt({
  subsets: ["thai"],
  weight: ["100", "400"],
  // display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={prompt.className}>
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
