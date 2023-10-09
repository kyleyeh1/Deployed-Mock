import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: Array<[string, string[][]]>;
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map(([command, result]) =>
        props.mode ? (
          <p>
            Command: {command}
            <br></br>
            Output: {result}
          </p>
        ) : (
          <p>{result}</p>
        )
      )}
    </div>
  );
}
