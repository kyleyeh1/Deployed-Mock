export { filePaths };

let filePaths = new Map<string, Array<Array<string>>>();

const emptyCSV = [[]];
const blankLinesCSV = [[], []];
const singeLineCSV = [["Water", "Fire", "Earth", "Air"]];
const doubleLineCSV = [
  ["Water", "Fire", "Earth", "Air"],
  ["New York", "Seattle", "Scotsdale", "Denver"],
];
const tripleLineRepeatCSV = [
  ["Water", "Fire", "Earth", "Air"],
  ["New York", "Seattle", "Scotsdale", "Denver"],
  ["Chicago", "Vancouver", "Detroit", "Seattle"],
];
const tripleLineNoRepeatCSV = [
  ["Water", "Fire", "Earth", "Air"],
  ["New York", "Seattle", "Scotsdale", "Denver"],
  ["Chicago", "Vancouver", "Detroit", "Montgomery"],
];

filePaths.set("empty.csv", emptyCSV);
filePaths.set("blank_lines.csv", blankLinesCSV);
filePaths.set("single_line.csv", singeLineCSV);
filePaths.set("double_line.csv", doubleLineCSV);
filePaths.set("triple_line_repeat.csv", tripleLineRepeatCSV);
filePaths.set("triple_line_no_repeat.csv", tripleLineNoRepeatCSV);
