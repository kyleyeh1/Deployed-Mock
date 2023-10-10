import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * The top level component and logic for the REPL.
 * 
 * @returns The high level rendering of the entire REPL.
 */
export default function REPL() {
  const [history, setHistory] = useState<Array<[string, string[][], boolean]>>(
    []
  );
  const [mode, setMode] = useState<boolean>(false);

  return (
    <div className="repl">
      <REPLHistory history={history} mode={mode} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}
