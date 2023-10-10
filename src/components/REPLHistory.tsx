import "../styles/main.css";

interface REPLHistoryProps {
  history: Array<[string, string[][], boolean]>;
  mode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {

  function rowToData(row: string[]) {
    return (
      <tr>
        {row.map((cell) => (
          <td> {cell} </td>
        ))}
      </tr>
    );
  }

  return (
    <div className="repl-history">
      {props.history.map(([command, result, displayTable]) =>
        props.mode ? (
          <div>
            <br></br>
            <p>Command: {command}</p>
            {displayTable ? (
              <table className="repl-table"> 
                Output: {result.map((row) => rowToData(row))}
              </table>
            ) : (
              <p>Output: {result[0][0]}</p>
            )}
          </div>
        ) : (
          <div>
            <br></br>
            {displayTable ? (
              <table className="repl-table">
                {result.map((row) => rowToData(row))}
              </table>
            ) : (
              <p>{result[0][0]}</p>
            )}
          </div>
        )
      )}
    </div>
  );
}
