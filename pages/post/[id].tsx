import React from "react";
import Layout from "../../components/Layout";
import { Heading, Box, Link } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import Editdeletepostbtns from "../../components/EditDeletePostBtns";
import { useRouter } from "next/router";
import NextLink from "next/link";

const Post = ({}) => {
  const { data, loading, error } = useGetPostFromUrl();
  console.log("post data: ", data);

  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>test data: {id}</Box>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <Editdeletepostbtns id={data.post.id} creatorId={data.post.creator.id} />
      <NextLink href={`/post/335`}>
        <Link>
          <Box>Previous Page: {id}</Box>
        </Link>
      </NextLink>
      <NextLink href={`/post/335`}>
        <Link>
          <Box>Next Page: {id}</Box>
        </Link>
      </NextLink>
    </Layout>
  );
};

export default Post;
// export default withApollo({ ssr: true })(Post);
