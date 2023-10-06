import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

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

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    const argumentArray = commandString.split(" ");
    if (argumentArray[0] === "mode" && argumentArray.length === 1) {
      setMode((prev) => !prev);
      console.log("mode");
    } else if (argumentArray[0] === "load" && argumentArray.length === 2) {
      console.log("load");
    } else if (argumentArray[0] === "view" && argumentArray.length === 1) {
      console.log("view");
    } else if (argumentArray[0] === "search" && argumentArray.length === 2) {
      console.log("search");
    } else {
      console.log("error");
    }

    props.setHistory([...props.history, commandString]);
    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
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
        Submitted {mode} times
      </button>
    </div>
  );
}
