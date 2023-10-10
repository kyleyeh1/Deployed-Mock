import "../styles/main.css";

/**
 * This interface defines the properties for the REPLHistoryProps function.
 */
interface REPLHistoryProps {
  history: Array<[string, string[][], boolean]>;
  mode: boolean;
}

/**
 * The function that represents and displays the REPL history.
 * 
 * @param props The properties defined above for the REPLHistory function.
 * @returns The rendering of what the REPLHistory component looks like on the webpage.
 */
export function REPLHistory(props: REPLHistoryProps) {
  /**
   * Helper function to get each row of the retrieved data.
   *
   * @param row the string array of data to be displayed
   * @returns a displayed row of data from the inputted string array.
   */
  function rowToData(row: string[]) {
    return (
      <tr>
        {row.map((cell) => (
          <td> {cell} </td>
        ))}
      </tr>
    );
  }

  /**
   * The rendering of what the component looks like on the webpage.
   */
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
