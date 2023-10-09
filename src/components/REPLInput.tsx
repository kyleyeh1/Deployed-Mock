import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  filePaths,
  searchToResult,
  displayResult1,
  displayResult2,
} from "../mockedJSON";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: Array<[string, string[][], boolean]>;
  setHistory: Dispatch<SetStateAction<Array<[string, string[][], boolean]>>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);

  //const [filepaths, setFilepaths] = useState<Map<String, Array<Array<String>>>>({'' : []});
  const [currFileData, setCurrFileData] = useState<string[][]>();

  function handleSubmit(commandString: string) {
    const argumentArray = commandString.split(" ");
    let command = argumentArray[0];
    let result: [string[][], boolean];
    console.log(commandString);
    // setCommandPrompt((prev) => (prev = argumentArray[0]));
    if (command === "mode" && argumentArray.length === 1) {
      result = handleMode();
    } else if (command === "load_file" && argumentArray.length === 2) {
      result = handleLoad(argumentArray[1]);
    } else if (command === "view" && argumentArray.length === 1) {
      result = handleView();
    } else if (
      command === "search" &&
      (argumentArray.length === 2 || argumentArray.length === 3)
    ) {
      result = [[["searched"]], false];
    } else if (command === "") {
      return;
    } else {
      result = [[["Error, command not found."]], false];
    }
    props.setHistory((prev) => [[command, ...result], ...prev]);
    console.log(props.history);
    setCommandString("");
  }

  function handleMode(): [string[][], boolean] {
    props.setMode((prev) => !prev);
    return [
      [[!props.mode ? "Mode set to brief." : "Mode set to verbose."]],
      false,
    ];
  }

  function handleLoad(filename: string): [string[][], boolean] {
    if (!filePaths.has(filename)) {
      return [
        [["Error, " + filename + " was unable to be found and loaded."]],
        false,
      ];
    } else {
      setCurrFileData((prev) => (prev = filePaths.get(filename)));
      return [[["Success, " + filename + " was loaded."]], false];
    }
  }

  function handleView(): [string[][], boolean] {
    if (currFileData === undefined) {
      return [[["Error with view."]], false];
    } else {
      return [currFileData, false];
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
        Mode is currently {props.mode ? "verbose" : "brief"}
      </button>
    </div>
  );
}
