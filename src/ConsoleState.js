export function ConsoleState(props) {
  let state = props.user + "@" + props.host + ":";
  return (
    <div>
      <span className="consoleState">{state}</span>
      <span className="consoleDir">/{props.dir}</span>$&nbsp;
      {props.command ? props.command : ""}
    </div>
  );
}
