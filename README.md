# Mock-jnaik2-kyeh6

## Details

## Project details

### Project Name: Server

### Contributors/Estimated Time:

Total Estimated Time: **10 hours**

[Link to Github repository](https://github.com/cs0320-f23/mock-jnaik2-kyeh6)

Team Members: Jaideep Naik (jnaik2), Kyle Yeh (kyeh6)

## Design Choices

### Structure

The main react component, App, is invoked in index.tsx and essentially servers as the anchor of
the program. App represents the entire program user interface, and it itself has a component for
REPL. App has a header and gives a general structure to the UI, but REPL is where all the interactive
functionality comes in. The top portion of REPL is the history section, which shows all the previous
commands/results and is displayed by the REPLHistory component. The command prompt (input) where
the user types into and can press submit is represented by the bottom portion of REPL and specifically
the REPLInput component. REPLInput wraps the HTML input element as a ControlledInput component so that
React can manage the state and rendering everytime the user interacts with it. REPLInput communicates
with REPLHistory by sending the most recent command/result to REPLHistory where its stored and then
displayed depending on the mode setting the user has.

### Data Structures Used and Motivations

We mocked our CSV data using a hashmap from string filepath names to 2D string arrays. The motivation
for this was to make mocking realistic but also simplistic enough for the frontend without duplicating
backend functionality. Thus, the actual searching functionality isn't tested but the ability to display
different forms of data is 2D.

We also stored our data in history using a state manager that had an array of tuples, where each tuple 
was of the form (string, string[][], boolean). Firstly, history is an array because we want to display 
all commands, not just the most recent one. Secondly, it's an array of tuples because there are multiple 
values we want to store with each command in order to display it properly. For example, we store a boolean 
in the tuple to allow REPLInput to communicate with REPLHistory on how each result should be displayed (e.g. 
as a table or standalone paragraph). The second element in the tuple is a string[][], which represents the 
possible format of the data in this mock (2D String array), and thus if the result is a string[][], it makes 
sense to include it as such. However, sometimes, when error messages are displayed or for commands like load, 
we simply print a string. In this case, the message is wrapped into a 2D string array to maintain the same 
type and format.

### Other High Level Design Choices

We used dependency injection to manage communication between REPLHistory and REPLInput.
The first way is through shared props, as REPL initialized a history state and injected it into
REPLInput and REPLHistory for them to use. This is a shared state so both of them rely on it, but
React abstracts the mechanics so we don't have to worry about it because we use their implementations.

## Errors/Bugs

There were no errors or bugs.

## Tests

Our testing suite consisted of both unit and integration tests. All four of our implemented methods,
mode, load_file, view, and search, utilized a combination of both of these tests. We also tested for
invalid inputs being loaded. Each one of the load_file, vie, and search tests utilized mocked data.

We first tested our mode command by changing the mode from brief to verbose back to brief and to
verbose once more. We made sure that the display was correct for each mode after each switch, and
that our history the command correctly for every call.

We then tested our load_file functionality. We tested load_file on a variety of different scenarios,
including loading an empty csv file, loading an actual csv file, loading a invalid csv file, and
loading without any file specified. We tested that the success and failure messages would be
displayed and that history of these calls would be kept for viewing, showing correctly in both brief
and verbose modes.

We then tested our view functionality. We tested view on a variety of different scenarios, including
viewing an empty csv file and viewing an actual csv file, making sure that the display and history were
being updated correctly. We also tested view interaction with load_file with integration testing where 
we would load a file, view it, load another file, view it, and finally load the first file again, and 
having one final view, making  sure that each load_file and view would perform the correct actions and 
update history correctly each time. Finally, we tested calling view before load, making sure that the 
correct error message was being displayed. We tested all of these scenarios in both verbose and brief mode.

We then tested our search functionality. We tested view on a variety of different scenarios, including
searching an empty csv file and searching an actual csv file, making sure that the display and history 
were being updated correctly. We also tested search interaction with view and load_file with integration 
testing where we would load a file, perform a plethora of different search types with that file it, view 
it, load another file, search more, and view again making sure that each load_file, view, and search would 
perform the correct actions and update history correctly each time. Finally, we tested calling search before 
load, making sure that the correct error message was being displayed. We tested all of these scenarios in 
both verbose and brief mode.

## How To Run...

### Tests

To run the tests in the terminal, make sure you have all npm dependencies installed
by first running "npm install" and then "npm install playwright" in your terminal. Then, to run
the tests, type "npx playwright test".

### The Program

To run the program, ensure that all dependencies are installed by navigating
to this directory and running "npm install" inside the terminal. This should
install all required dependencies locally for you. Then, type "npm start" and
this should open a local server for you to access.