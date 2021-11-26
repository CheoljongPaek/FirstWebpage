import React from "react";
import NextLink from "next/link";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  LinkProps,
} from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Logo from "./Logo";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { Url, UrlObject } from "url";
import { HamburgerIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./ThemeToggleBtn";
import { IoLogoGithub } from "react-icons/io5";

interface NavBar2Props {
  href?: UrlObject | string;
  path: any;
  _target?: any;
}

interface LinkItemProps extends Omit<LinkProps, "href">, NavBar2Props {
  href: UrlObject | string;
}

const LinkItem: React.FC<LinkItemProps> = ({
  href,
  path,
  _target,
  children,
  ...props
}) => {
  const active = path === href;
  const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");

  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={active ? "grassTeal" : undefined}
        color={active ? "#202023" : inactiveColor}
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Navbar2: React.FC<NavBar2Props> = ({
  href,
  path,
  _target,
  children,
  ...props
}) => {
  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg={useColorModeValue("#ffffff40", "#20202380")}
      css={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          mt={{ base: 4, md: "auto" }}
          flexGrow={1}
          spacing="24px"
        >
          <LinkItem path={path} href="/works">
            Works
          </LinkItem>
          <LinkItem path={path} href="/posts">
            Posts
          </LinkItem>
          <LinkItem
            _target="_blank"
            path={path}
            href="https://github.com"
            display="inline-flex"
            alignItems="center"
            pl={2}
            style={{ gap: 4 }}
          >
            <IoLogoGithub />
            <div>GitHub</div>
          </LinkItem>
        </Stack>
        <Box flex={1} align="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>About</MenuItem>
                </NextLink>
                <NextLink href="/works" passHref>
                  <MenuItem as={Link}>Works</MenuItem>
                </NextLink>
                <NextLink href="/posts" passHref>
                  <MenuItem as={Link}>Posts</MenuItem>
                </NextLink>
                <MenuItem
                  as={Link}
                  href="https://github.com/craftzdog/craftzdog-homepage"
                >
                  GitHub
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar2;
