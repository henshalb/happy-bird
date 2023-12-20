import { Button, Card, Loader, Text, TextInput, Textarea, Title, rem } from "@mantine/core";
import { useNavigation, useSubmit } from "@remix-run/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useAppContext } from "~/utils/state/store";

function QueryForm() {
  const { state, dispatch } = useAppContext();
  const submit = useSubmit();
  const navigation = useNavigation();

  const searchHandler = () => {
    let formData = new FormData();
    formData.append("query", state.query);
    submit(formData, { replace: true, method: "post" });
  };

  return (
    <Card withBorder p={"md"} mt={"md"}>
      <Title order={4}>MySQL Query</Title>
      <Text size={"xs"}>Enter the query you need to visualise</Text>
      <Textarea
        w={"100%"}
        mt={"xs"}
        defaultValue={state.query}
        placeholder="Enter your MySQL query here"
        onChange={(e) => dispatch({query: e.target.value})}
      />
      {state.connected ? null : (
        <Text mt={"xs"} size={"xs"}>
          Connect to database before querying
        </Text>
      )}
      <Button
        onClick={searchHandler}
        disabled={state.connected && state.query ? false : true}
        mt={"sm"}
        w={"min-content"}
        variant={"outline"}
        fullWidth={false}
      >
        {navigation.state == "submitting" ? 
            <>
            <Loader size="xs" type="dots" />
            </>
            : <>
            Visualise
          <IconArrowRight size={20} style={{ marginLeft: rem(8)}} />
            </> }
      </Button>
    </Card>
  );
}

export { QueryForm };
