import {
  Card,
  SimpleGrid,
  TextInput,
  Title,
  Text,
  Button,
  rem,
  Group,
  PasswordInput,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAppContext } from "~/utils/store";
import { IconCircleFilled } from "@tabler/icons-react";

function ConnectionForm() {
  const { state, dispatch } = useAppContext();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleClick = (stateVariable, newState) => {
    dispatch({ [stateVariable]: newState });
  };

  useEffect(() => {
    const stateVerifier = [
      state.host,
      state.username,
      state.database,
      state.password,
    ];
    const cookieVerifier = [
      Cookies.get("host"),
      Cookies.get("username"),
      Cookies.get("database"),
      Cookies.get("password"),
    ];
    if (!stateVerifier.includes("") && !cookieVerifier.includes(undefined)) {
      dispatch({ connected: true });
    }
  }, []);

  useEffect(() => {
    const verifier = [
      state.host,
      state.username,
      state.database,
      state.password,
    ];
    if (verifier.includes("")) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [state]);

  const submitHandler = () => {
    Cookies.set("host", state.host);
    Cookies.set("username", state.username);
    Cookies.set("database", state.database);
    Cookies.set("password", state.password);
    dispatch({ connected: true });
  };

  return (
    <Card withBorder p={"md"} mt={"md"}>
      <Title order={4}>MySQL Database</Title>
      <Text size={"xs"}>Connect to any database with stuctured data</Text>
      <SimpleGrid mt={"xs"} cols={2} spacing="xs" verticalSpacing="xs">
        <TextInput
          label="MySQL Host"
          placeholder="Host URL"
          disabled={state.connected}
          defaultValue={state.host}
          onChange={(e) => handleClick("host", e.target.value)}
        />
        <TextInput
          label="MySQL Database"
          placeholder="Database name"
          disabled={state.connected}
          defaultValue={state.database}
          onChange={(e) => handleClick("database", e.target.value)}
        />
        <TextInput
          label="MySQL Username"
          disabled={state.connected}
          placeholder="Database username"
          defaultValue={state.username}
          onChange={(e) => handleClick("username", e.target.value)}
        />
        <PasswordInput
          label="MySQL Password"
          disabled={state.connected}
          placeholder="Database password"
          defaultValue={state.password}
          onChange={(e) => handleClick("password", e.target.value)}
        />
      </SimpleGrid>
      {state.connected ? (
        <Group>
          <Button
            mt={"sm"}
            w={"min-content"}
            variant={"default"}
            fullWidth={false}
            c={"green"}
          >
            Connected
            <IconCircleFilled
              color={"green"}
              size={15}
              style={{ marginLeft: rem(8) }}
            />
          </Button>
          <Button
            mt={"sm"}
            w={"min-content"}
            variant={"light"}
            fullWidth={false}
            onClick={() => {
              dispatch({ connected: false });
            }}
          >
            Edit
          </Button>
        </Group>
      ) : (
        <Button
          disabled={buttonDisabled}
          mt={"sm"}
          w={"min-content"}
          variant={"outline"}
          fullWidth={false}
          onClick={submitHandler}
        >
          Connect
        </Button>
      )}
    </Card>
  );
}

export { ConnectionForm };
