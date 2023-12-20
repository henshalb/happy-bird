import { Card, Title, Text } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { Footer } from "~/Footer/Footer";
import { ConnectionForm } from "~/Form/Connection";
import { QueryForm } from "~/Form/Query";
import { LineChart } from "~/Graph/Graph";
import { connectDatabase, pingDatabase } from "~/utils/state/db.server";
import { useAppContext } from "~/utils/state/store";

export const meta: MetaFunction = () => {
  return [{ title: "dataviz - Database Query Tool" }];
};
export const action = async ({ request }) => {
  const cookies = request.headers.get("Cookie") || null;
  const host = cookies?.match(/host=([^;]+)/)?.[1] || null;
  const database = cookies?.match(/database=([^;]+)/)?.[1] || null;
  const username = cookies?.match(/username=([^;]+)/)?.[1] || null;
  const password = cookies?.match(/password=([^;]+)/)?.[1] || null;
  const data = await request.formData();
  
  return new Promise((resolve, reject) => {
    const connection = connectDatabase(host, database, username, password);
    connection.query(data.get("query"), (err, results, fields) => {
      if (err) {
        reject(err);
        return null;
      }

      connection.end((endErr) => {
        if (endErr) {
          reject(endErr);
          return null;
        }

        resolve(results);
      });
    });
  });
};

export default function Index() {
  const actionData = useActionData();
  return (
    <>
      <ConnectionForm />
      <QueryForm />
      <LineChart data={actionData} />
    </>
  );
}
