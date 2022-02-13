import { ConsoleState } from "./ConsoleState";

export function ConsoleHistory(props) {
  const historyItems = props.history.map((history, key) => (
    <li key={key}>
      <ConsoleState
        user={props.user}
        host={props.host}
        dir={history[0]}
        command={history[1]}
      />
      {history[2] ? history[2] : ""}
    </li>
  ));
  return <ul>{historyItems}</ul>;
}
