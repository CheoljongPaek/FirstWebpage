import { Container, Divider, Heading, SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { WorkGridItem } from "../components/GridItem";
import MotionLayout from "../components/layouts/article";
import Section from "../components/section";
import thumbInkdrop from "../public/images/works/inkdrop_eyecatch.png";

interface worksProps {}

const Works: React.FC<worksProps> = ({}) => {
  return (
    <MotionLayout title="Works">
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading>
        <SimpleGrid column={[1, 1, 2]} gap={6}>
          <Section>
            <WorkGridItem id="inkdrop" title="inkdrop" thumbnail={thumbInkdrop}>
              A Markdown note-taking app with 100+ plugins, cross-platform and
              encrypted data sync support
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem id="inkdrop" title="inkdrop" thumbnail={thumbInkdrop}>
              A Markdown note-taking app with 100+ plugins, cross-platform and
              encrypted data sync support
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={0.2}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
            Collaborations
          </Heading>
        </Section>

        <Section delay={0.4}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
            Old works
          </Heading>
        </Section>
      </Container>
    </MotionLayout>
  );
};

export default Works;
