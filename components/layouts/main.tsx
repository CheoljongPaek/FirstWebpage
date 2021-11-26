import { Box, Container } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Router } from "next/router";
import React from "react";
import Navbar2 from "../NavBar2";
import RectangleLoader from "../RectangleLoader";

interface mainProps {
  router: Router;
}

const LoadRectangle = dynamic(() => import("../Rectangle"), {
  ssr: false,
  loading: () => <RectangleLoader />,
});

const Main: React.FC<mainProps> = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>CJ Paek - Homepage</title>
      </Head>
      <Navbar2 path={router.asPath} />
      <Container maxW="container.md" pt={14}>
        {/* <LoadRectangle /> */}
        {children}
      </Container>
    </Box>
  );
};

export default Main;
