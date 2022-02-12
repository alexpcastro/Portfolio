export function ConsoleState(user, host, dir) {
  let state = { user } + "@" + { host } + ":/" + { dir } + "$";
  return state;
}
