import { motion } from "framer-motion";
import { chakra, shouldForwardProp } from "@chakra-ui/react";

// interface sectionProps {
//   delay: number;
// }

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === "transition";
  },
});

// console.log(StyledDiv);

// const Section: React.FC<sectionProps> = ({ children, delay = 0 }) => {
const Section = ({ children, delay = 0 }) => {
  return (
    <StyledDiv
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      mb={6}
      transition={{ duration: 0.8, delay }}
      // transition={{ delay }}
    >
      {children}
    </StyledDiv>
  );
};

export default Section;
