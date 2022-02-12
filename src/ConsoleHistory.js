export function ConsoleHistory(props) {
  const historyItems = props.history.map((history, key) => (
    <li key={key}>
      /{history[0]}/ {history[1]}
    </li>
  ));
  return <ul>{historyItems}</ul>;
}
