import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";
import client from "../utils/apolloClient";
import { AppProps } from "next/app";
import Layout from "../components/layouts/main";
import Fonts from "../components/fonts";
import { AnimatePresence } from "framer-motion";
// import "@fontsource/m-plus-rounded-1c";

function MyWeb({ Component, pageProps, router }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Fonts />
        <Layout router={router} />
        <AnimatePresence exitBeforeEnter initial={true}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyWeb;
