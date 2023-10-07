import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[][];
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((command) =>
        props.mode ? (
          <p>
            Command: {command[0]}
            <br></br>
            Output: {command[1]}
          </p>
        ) : (
          <p>{command[1]}</p>
        )
      )}
    </div>
  );
}
