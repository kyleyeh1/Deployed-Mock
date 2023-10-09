export { filePaths, searchToResult, displayResult1, displayResult2 };

let filePaths = new Map<string, Array<Array<string>>>();

const emptyCSV = [[]];
const blankLinesCSV = [[], []];
const singeLineCSV = [["Water", "Fire", "Earth", "Air"]];
const doubleLineCSV = [
  ["Water", "Fire", "Earth", "Air"],
  ["New_York", "Seattle", "Scotsdale", "Denver"],
];
const tripleLineRepeatCSV = [
  ["Water", "Fire", "Earth", "Air"],
  ["New_York", "Seattle", "Scotsdale", "Denver"],
  ["Chicago", "Vancouver", "Detroit", "Seattle"],
];
const tripleLineNoRepeatCSV = [
  ["Water", "Fire", "Earth", "Air"],
  ["New_York", "Seattle", "Scotsdale", "Denver"],
  ["Chicago", "Vancouver", "Detroit", "Montgomery"],
];

filePaths.set("empty.csv", emptyCSV);
filePaths.set("blank_lines.csv", blankLinesCSV);
filePaths.set("single_line.csv", singeLineCSV);
filePaths.set("double_line.csv", doubleLineCSV);
filePaths.set("triple_line.csv", tripleLineRepeatCSV);
filePaths.set("triple_line_no_repeat.csv", tripleLineNoRepeatCSV);

let searchToResult = new Map<string | [string, string], Array<Array<string>>>();

const displayResult1 = [["New_York", "Seattle", "Scotsdale", "Denver"]];
const displayResult2 = [
  ["New_York", "Seattle", "Scotsdale", "Denver"],
  ["Chicago", "Vancouver", "Detroit", "Seattle"],
];

searchToResult.set("New_York", displayResult1);
searchToResult.set("Seattle", displayResult2);
searchToResult.set("Scotsdale", displayResult1);
searchToResult.set("Denver", displayResult1);

searchToResult.set("New_York0", displayResult1);
searchToResult.set("Seattle1", displayResult1);
searchToResult.set("Scotsdale2", displayResult1);
searchToResult.set("Denver3", displayResult1);

searchToResult.set("New_YorkWater", displayResult1);
searchToResult.set("SeattleFire", displayResult1);
searchToResult.set("ScotsdaleEarth", displayResult1);
searchToResult.set("DenverAir", displayResult1);
