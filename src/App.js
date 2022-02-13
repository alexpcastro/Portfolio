import "./styles.css";
import { Component } from "react";
import { ConsoleHistory } from "./ConsoleHistory";
import { ConsoleState } from "./ConsoleState";

let fileTree = {
  type: "directory",
  name: "home",
  children: [
    {
      type: "directory",
      name: "projects",
      children: [
        {
          type: "file",
          name: "proj1.txt"
        },
        {
          type: "file",
          name: "proj2.txt"
        }
      ]
    },
    {
      type: "file",
      name: "resume.pdf"
    }
  ]
};

let files = {
  type: "directory",
  name: "home",
  children: [
    {
      type: "file",
      name: "resume.pdf"
    },
    {
      type: "file",
      name: "about.txt"
    }
  ]
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      history: [],
      current_dir: "",
      user: "user",
      host: "alexpcastro.com"
    };
  }

  isValidCommand(command) {
    let validCommands = ["cd", "ls", "cat"];
    return validCommands.includes(command);
  }

  handleSubmitCommand(e) {
    var inputFormData = new FormData(e.target);
    let commandFormObject = Object.fromEntries(inputFormData.entries());
    let command = commandFormObject["consoleInput"].trim();
    let response = "";
    let commandHistory = "";
    // Split command on spaces and get words in array
    // split command on the first space
    // check if text left of first space is in valid_commands
    // check if right side is a

    // Check if command exists
    if (command) {
      // Split command on spaces and get words in array
      let commandParameters = command.split(" ");
      // Check if first word is command
      // and check if length of array is less than 2
      if (this.isValidCommand(commandParameters[0])) {
        switch (commandParameters[0]) {
          case "cd":
            if (commandParameters.length === 2) {
              response = "changing dir to " + commandParameters[1];
            } else if (commandParameters.length > 2)
              response =
                "-bash: " + commandParameters[0] + ": too many arguments";
            break;
          case "ls":
            response = "listing files...";
            break;
          case "cat":
            if (commandParameters.length === 2) {
              response = "opening " + commandParameters[1];
            } else if (commandParameters.length > 2)
              response =
                "-bash: " + commandParameters[0] + ": too many arguments";
            break;
          default:
          // code block
        }
      } else response = "-bash: " + command + ": command not found";

      commandHistory = [this.state.current_dir, command, response];
    } else {
      commandHistory = [this.state.current_dir, command];
    }

    this.setState((prevState) => ({
      history: [...prevState.history, commandHistory],
      inputValue: ""
    }));
    e.preventDefault();
    e.target.reset();
    document.getElementById("consoleInput").focus();
  }

  render() {
    return (
      <>
        <div>
          <p>Compiling projects... complete</p>
          <p>System Online. Welcome to Alex Castro's portfolio.</p>
          <p>Accessed: {Date()}</p>
          <ConsoleHistory
            user={this.state.user}
            host={this.state.host}
            history={this.state.history}
          />
          <div style={{ display: "flex", width: "100%" }}>
            <ConsoleState
              user={this.state.user}
              host={this.state.host}
              dir={this.state.current_dir}
            />
            <form onSubmit={this.handleSubmitCommand.bind(this)}>
              <input
                autoFocus
                autoComplete="off"
                id="consoleInput"
                name="consoleInput"
                type="text"
                maxLength="20"
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}
