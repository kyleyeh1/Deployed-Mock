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
  history: Array<[string, string[][], boolean]>;
  setHistory: Dispatch<SetStateAction<Array<[string, string[][], boolean]>>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [currFileData, setCurrFileData] = useState<string[][]>();

  /**
   * Handles what command is executed after submit is pressed based on what's typed
   * @param commandString the string entered in the command prompt
   * @returns {void}
   */
  function handleSubmit(commandString: string): void {
    const argumentArray = commandString.split(" ");
    const argArrSize = argumentArray.length;
    const command = argumentArray[0];
    let result: [string[][], boolean];
    if (command === "mode" && argArrSize === 1) {
      result = handleMode();
    } else if (command === "load_file" && argArrSize === 2) {
      result = handleLoad(argumentArray[1]);
    } else if (command === "view" && argArrSize === 1) {
      result = handleView();
    } else if (
      command === "search" &&
      (argumentArray.length === 2 || argArrSize === 3)
    ) {
      result = handleSearch(argumentArray);
    } else if (command === "") {
      return;
    } else {
      result = [
        [
          [
            "Error: '" +
              command +
              "' is either an invalid command or has an invalid number of arguments.",
          ],
        ],
        false,
      ];
    }
    props.setHistory((prev) => [[command, ...result], ...prev]);

    setCommandString("");
  }

  /**
   * Updates the mode state and returns the result of executing mode command
   * @return {[string[][], boolean]} A tuple containing the command result and a flag indicating whether to display the result as a table
   */
  function handleMode(): [string[][], boolean] {
    props.setMode((prev) => !prev);
    return [
      [[!props.mode ? "Mode set to brief." : "Mode set to verbose."]],
      false,
    ];
  }

  /**
   * Updates the currently loaded file and returns the result of executing load_file command
   * @return {[string[][], boolean]} A tuple containing the command result and a flag indicating whether to display the result as a table
   */
  function handleLoad(filename: string): [string[][], boolean] {
    if (!filePaths.has(filename)) {
      return [
        [["Error: " + filename + " was unable to be found and loaded."]],
        false,
      ];
    } else {
      setCurrFileData((prev) => (prev = filePaths.get(filename)));
      return [[["Success: " + filename + " was loaded."]], false];
    }
  }

  /**
   * Returns the result of executing view command
   * @return {[string[][], boolean]} A tuple containing the command result and a flag indicating whether to display the result as a table
   */
  function handleView(): [string[][], boolean] {
    if (currFileData === undefined) {
      return [[["Error: No file loaded."]], false];
    } else {
      return [currFileData, true];
    }
  }

  /**
   * Returns the result of executing the search command
   * @return {[string[][], boolean]} A tuple containing the command result and a flag indicating whether to display the result as a table
   */
  function handleSearch(commandArray: string[]): [string[][], boolean] {
    let errorMessage = [["Error: No value found."]];
    let search =
      commandArray.length == 2
        ? commandArray[1]
        : commandArray[1] + commandArray[2];

    let searchResult = searchToResult.get(search);
    return searchResult === undefined
      ? [errorMessage, false]
      : [searchResult, true];
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submit; Mode: {props.mode ? "verbose" : "brief"}
      </button>
    </div>
  );
}
