import React from "react";
import { Link, ListItem, Button, Icon } from "@chakra-ui/react";

interface ListItemBtnProps {
  href: string;
  icon: any;
}

const ListItemBtn: React.FC<ListItemBtnProps> = ({ children, href, icon }) => {
  return (
    <ListItem>
      <Link href={href} target="_blank">
        <Button
          leftIcon={<Icon as={icon} />}
          variant="ghost"
          colorScheme="teal"
        >
          {children}
        </Button>
      </Link>
    </ListItem>
  );
};

export default ListItemBtn;
