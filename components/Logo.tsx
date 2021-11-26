import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Link, Text } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { useColorModeValue } from "@chakra-ui/color-mode";

interface LogoProps {}

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
  img {
    transition: 200ms ease;
  }
  &:hover img {
    transform: rotate(20deg);
  }
`;

const Logo: React.FC<LogoProps> = ({}) => {
  const footPrintImg = `/images/footprint${useColorModeValue("", "-dark")}.png`;
  // const footPrintImg = `/images/takuya.jpg`;
  return (
    <NextLink href="/newMain">
      <Link>
        <LogoBox>
          <Image src={footPrintImg} width={20} height={20} alt="logo" />
          <Text
            color={useColorModeValue("gray.800", "whiteAlpha.900")}
            fontWeight="bold"
            ml={3}
            fontFamily="heading"
          >
            Cheoljong Paek
          </Text>
        </LogoBox>
      </Link>
    </NextLink>
  );
};

export default Logo;
