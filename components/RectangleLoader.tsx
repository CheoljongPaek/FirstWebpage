import { Box, BoxProps, chakra, forwardRef } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

export const RectangleSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
);
//chakra.div
const Card = chakra("div", {
  // attach style props
  baseStyle: {
    px: "4",
    py: "5",
    rounded: "sm",
    shadow: "lg",
  },
});

type DivProps = React.HTMLProps<HTMLDivElement>;

export const RectangleContainer = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => (
    // export const RectangleContainer = forwardRef<BoxProps, "div">((props, ref) => (
    <Box
      className="voxel-dog"
      ref={ref}
      m="auto"
      mt={["-20px", "-60px", "-120px"]}
      mb={["-40px", "-140px", "-200px"]}
      w={[280, 480, 640]}
      h={[280, 480, 640]}
      position="relative"
    >
      {props.children}
    </Box>
  )
);
const Loader = () => {
  return (
    <RectangleContainer>
      <RectangleSpinner />
    </RectangleContainer>
  );
};

export default Loader;
