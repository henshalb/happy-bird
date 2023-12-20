import type { MetaFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { ConnectionForm } from "~/Form/Connection";
import { QueryForm } from "~/Form/Query";
import { LineChart } from "~/Graph/Graph";
import { connectDatabase } from "~/utils/db.server";

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

  const executor = new Promise((resolve, reject) => {
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

  return executor
    .then((result) => {
      return { success: result };
    })
    .catch((error) => {
      return { error: error };
    });
};

export default function Index() {
  const actionData = useActionData();
  return (
    <>
      <ConnectionForm />
      <QueryForm data={actionData} />
      <LineChart data={actionData} />
    </>
  );
}
