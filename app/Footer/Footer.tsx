import { Container, Text, ActionIcon, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container size={"lg"} className={classes.inner}>
        <Text size={"xs"} c={"dimmed"}>Created by Henshal B</Text>
      </Container>
    </div>
  );
}