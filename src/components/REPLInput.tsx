import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { filePaths } from "../mockedJSON";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);
  const [mode, setMode] = useState<boolean>(false);

  //const [filepaths, setFilepaths] = useState<Map<String, Array<Array<String>>>>({'' : []});
  const [currFileData, setCurrFileData] = useState<string[][]>();
  // const [commandPrompt, setCommandPrompt] = useState<string>("dog");

  function handleSubmit(commandString: string) {
    const argumentArray = commandString.split(" ");
    let result;
    console.log(commandString);
    // setCommandPrompt((prev) => (prev = argumentArray[0]));
    if (argumentArray[0] === "mode" && argumentArray.length === 1) {
      props.setHistory((prev) => [handleMode(), ...prev]);
    } else if (argumentArray[0] === "load_file" && argumentArray.length === 2) {
      props.setHistory((prev) => [handleLoad(argumentArray[1]), ...prev]);
    } else if (argumentArray[0] === "view" && argumentArray.length === 1) {
      props.setHistory((prev) => ["viewed", ...prev]);
    } else if (argumentArray[0] === "search" && argumentArray.length === 2) {
      props.setHistory((prev) => ["search", ...prev]);
    } else if (argumentArray[0] === "") {
      return;
    } else {
      // props.setResult((prev) => (prev = "error"));
      // props.setHistory((prev) => [props.result, ...prev]);
    }
    // props.setHistory((prev) => [...prev, result]);
    console.log(props.history);
    setCommandString("");
  }

  function handleMode() {
    setMode((prev) => !prev);
    if (!mode) {
      return "Mode changed to verbose.";
    } else {
      return "Mode changed to brief";
    }
  }

  function handleLoad(filename: string) {
    if (!filePaths.has(filename)) {
      return "Error: " + filename + " was unable to be found and loaded.";
    } else {
      return "Success: " + filename + " was loaded.";
      setCurrFileData((prev) => (prev = filePaths.get(filename)));
    }
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Mode is currently {mode ? "verbose" : "brief"}.
      </button>
    </div>
  );
}
