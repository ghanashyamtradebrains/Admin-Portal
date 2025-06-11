import "./globals.css";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import AuthLayout from "./AuthLayout";
import ViewTransitionWrapper from "@/components/Loader/ViewTransitionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Portal",
  description: "Admin Portal for managing the application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ViewTransitionWrapper>
            <AuthLayout>{children}</AuthLayout>
          </ViewTransitionWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
