import classes from './Footer.module.css';
import { Container, Text } from '@mantine/core';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container size={"lg"} className={classes.inner}>
        <Text size={"xs"} c={"dimmed"}>Created by Henshal B</Text>
      </Container>
    </div>
  );
}