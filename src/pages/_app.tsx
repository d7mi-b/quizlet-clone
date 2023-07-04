import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Head from "next/head";
import "~/styles/globals.css";
import { AuthProvider, ProtectRoute } from "~/context/AuthContext";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Head>
        <title>Quizlet Clone</title>
        <meta name="description" content="Quizlet Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
      <Footer />
    </AuthProvider>
  );
};

export default api.withTRPC(MyApp);
