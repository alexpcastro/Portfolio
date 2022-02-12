import "./styles.css";
import { Component } from "react";
import { ConsoleHistory } from "./ConsoleHistory";
import { ConsoleState } from "./ConsoleState";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
      current_dir: "home",
      user: "visitor",
      host: "alexpcastro.com"
    };
  }
  isValidCommand(command) {
    return true;
  }
  handleSubmitCommand(e) {
    var inputFormData = new FormData(e.target);
    let commandFormObject = Object.fromEntries(inputFormData.entries());
    let commandInputValue = [
      this.state.current_dir,
      commandFormObject["consoleInput"]
    ];

    this.setState((prevState) => ({
      history: [...prevState.history, commandInputValue]
    }));

    e.preventDefault();
  }
  render() {
    return (
      <>
        <div>
          <ConsoleHistory history={this.state.history} />
          <ConsoleState
            user={this.state.user}
            host={this.state.host}
            dir={this.state.current_dir}
          />
          <form onSubmit={this.handleSubmitCommand.bind(this)}>
            <input name="consoleInput" type="text" />
          </form>
        </div>
      </>
    );
  }
}
