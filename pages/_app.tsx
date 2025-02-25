import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "@/context/authContext";

import Sidebar from "@/components/sidebar/sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
      <div className="flex">
          <Sidebar />
        <div className="flex-1 w-5/6 p-4 flex">
          <div className="w-3/4 mx-auto p-8 bg-white-100 rounded-lg shadow-md">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
      </ThemeProvider>
    </AuthProvider>

  );
}