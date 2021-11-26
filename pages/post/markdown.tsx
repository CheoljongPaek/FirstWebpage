import { Box, Heading } from "@chakra-ui/layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import Layout from "../../components/Layout";
import { PostDocument } from "../../generated/graphql";
import client from "../../utils/apolloClient";

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await client.query({
    query: PostDocument,
    variables: {
      id: 340,
    },
  });

  console.log("context: ", context.params);

  return {
    props: {
      posts: data?.post?.title,
    }, // will be passed to the page component as props
  };
};

const Markdown = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Heading>MarkDown</Heading>
      <Box>{posts}</Box>
    </Layout>
  );
};

// export default withApollo({ ssr: true })(Markdown);
export default Markdown;
