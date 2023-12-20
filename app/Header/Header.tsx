import { Title, Container, Flex, Text } from "@mantine/core";
import classes from "./Header.module.css";
import { useNavigate } from "@remix-run/react";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";

function Brand() {
  const navigate = useNavigate();
  return (
    <>
      <Flex align={"start"} justify={"start"} direction={"column"}>
        <Title
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          className={classes.title}
        >
          dataviz
        </Title>
        <Text size={"xs"} c={"dimmed"}>
          Database Query Tool
        </Text>
      </Flex>
    </>
  );
}

export function Header() {
  return (
    <>
      <header className={classes.header}>
        <Container size="lg" className={classes.inner}>
          <Flex align={"center"}>
            <Brand />
          </Flex>
          <Flex align={"center"}>
            <ColorSchemeToggle />
          </Flex>
        </Container>
      </header>
    </>
  );
}