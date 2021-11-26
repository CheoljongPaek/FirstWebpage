import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostBtnsProps {
  id: number;
  creatorId: number;
}

const Editdeletepostbtns: React.FC<EditDeletePostBtnsProps> = ({
  id,
  creatorId,
}) => {
  const [deletePost] = useDeletePostMutation();
  const { data: meData } = useMeQuery();

  if (!meData?.me) {
    return null;
  }

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Flex ml="auto" alignItems="flex-end">
      <Flex mr="1">
        <IconButton
          ml="auto"
          icon={<DeleteIcon />}
          colorScheme="red"
          aria-label="Delete Post"
          onClick={() => {
            deletePost({
              variables: {
                id,
              },
              update: (cache) => {
                cache.evict({
                  // Post:33
                  id: "Post:" + id,
                });
              },
            });
          }}
        />
      </Flex>
      <Flex>
        <NextLink href={`/post/edit/${id}`}>
          <IconButton
            as={Link}
            ml="auto"
            icon={<EditIcon />}
            colorScheme="linkedin"
            aria-label="Update Post"
          />
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Editdeletepostbtns;
