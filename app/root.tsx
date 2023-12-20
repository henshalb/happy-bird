import "@mantine/core/styles.css";

import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import { Header } from "./Header/Header";
import { AppProvider } from "~/utils/store";
import { Footer } from "./Footer/Footer";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <AppProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider>
            <Header />
            <Container size="lg">
              <Outlet />
            </Container>
            <Footer />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </MantineProvider>
        </body>
      </html>
    </AppProvider>
  );
}
