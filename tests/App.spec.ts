import { test, expect } from "@playwright/test";

/**
 * This function occurs before each playwright test. It tells
 * playwright to go to the url where the webpage is.
 */
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/**
 * This test checks for mode changes from brief to verbose and
 * back to brief, making sure that the history shows and changes
 * correctly with each mode switch, keeping track of all prior
 * commands and outputs.
 */
test("mode history changes with brief and verbose", async ({ page }) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Command: mode")).toBeVisible();
  await expect(page.getByText("Output: Mode set to brief.")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await expect(page.getByText("Mode set to brief.")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Command: mode")).toHaveCount(3);
  await expect(page.getByText("Output: Mode set to brief.")).toHaveCount(2);
});

/**
 * This test checks invalid commands in both brief and verbose
 * mode, making sure the history and errors are displayed correctly.
 */
test("invalid command with mode switches", async ({ page }) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("modes");
  await page.getByRole("button").click();
  await expect(
    page.getByText(
      "Error: 'modes' is either an invalid command or has an invalid number of arguments."
    )
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(
    page.getByText(
      "Output: Error: 'modes' is either an invalid command or has an invalid number of arguments."
    )
  ).toBeVisible();
  await expect(page.getByText("Command: modes")).toBeVisible();
});

/**
 * This test checks all permutations possible with load_file,
 * testing that both empty and filled csvs can be loaded
 * correctly, making sure that the history and messages are
 * being kept track of, in both brief and verbose modes.
 * It also checks for when a bad file is given to the program
 * and if no file is given at all, making sure the the history
 * and errors are being kept track of, in both brief and verbose
 * modes.
 */
test("load_file commands show success and failure under verbose and brief modes, loads mutiple times", async ({
  page,
}) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file empty.csv");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();

  await expect(page.getByText("Success: empty.csv was loaded.")).toBeVisible();

  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();

  await expect(page.getByText("Command: load_file")).toBeVisible();
  await expect(
    page.getByText("Output: Success: empty.csv was loaded.")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file triple_line.csv");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();

  await expect(
    page.getByText("Output: Success: triple_line.csv was loaded.")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();

  await expect(
    page.getByText("Success: triple_line.csv was loaded.")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file blah");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();

  await expect(
    page.getByText("Error: blah was unable to be found and loaded.")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();

  await expect(
    page.getByText("Output: Error: blah was unable to be found and loaded.")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();

  await expect(
    page.getByText(
      "Output: Error: 'load_file' is either an invalid command or has an invalid number of arguments."
    )
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();

  await expect(
    page.getByText(
      "Error: 'load_file' is either an invalid command or has an invalid number of arguments."
    )
  ).toBeVisible();
});

/**
 * This test checks that when calling view before load, the
 * appropriate error message is given and recorded in history
 * in both brief and verbose modes.
 */
test("view commands show failure under verbose and brief modes", async ({
  page,
}) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await expect(page.getByText("Error: No file loaded.")).toBeVisible();

  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Command: view")).toBeVisible();
  await expect(page.getByText("Output: Error: No file loaded.")).toBeVisible();
});

/**
 * This test checks that load and view will correctly display
 * and data that has rows of ununiform length, making sure that
 * it is reccorded in history and displayed in both brief and
 * verbose mode.
 */
test("load and view commands work with data that's not uniform in dimensions", async ({
  page,
}) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file messedup.csv");
  await page.getByRole("button").click();
  await expect(page.getByText("Success: messedup.csv was loaded.")).toHaveCount(
    1
  );

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();

  await expect(page.getByText("Water")).toHaveCount(1);
  await expect(page.getByText("Fire")).toHaveCount(0);
  await expect(page.getByText("Earth")).toHaveCount(0);
  await expect(page.getByText("Air")).toHaveCount(0);
  await expect(page.getByText("New_York")).toHaveCount(1);
  await expect(page.getByText("Seattle")).toHaveCount(1);
  await expect(page.getByText("Scotsdale")).toHaveCount(1);
  await expect(page.getByText("Denver")).toHaveCount(1);

  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Command: view")).toHaveCount(1);
  await expect(page.getByText("Command: load_file")).toHaveCount(1);
  await expect(
    page.getByText("Output: Success: messedup.csv was loaded.")
  ).toHaveCount(1);
});

/**
 * This test checks view and its integration with load, and mode.
 * First, it checks that a csv file was loaded.
 * Then it switches modes and checks that the values are slightly different with same frequency.
 * Then it loads another file, tests the frequencies, and loads the original file and verifies that the frequencies of the original are more than the other one.
 */
test("view commands show success under verbose and brief modes, view mutiple times, also integration test with load", async ({
  page,
}) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file single_line.csv");
  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();

  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await expect(page.getByText("Water")).toBeVisible();
  await expect(page.getByText("Fire")).toBeVisible();
  await expect(page.getByText("Earth")).toBeVisible();
  await expect(page.getByText("Air")).toBeVisible();

  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Command: view")).toBeVisible();
  await expect(page.getByText("Output:")).toHaveCount(3);

  await expect(page.getByText("Water")).toBeVisible();
  await expect(page.getByText("Fire")).toBeVisible();
  await expect(page.getByText("Earth")).toBeVisible();
  await expect(page.getByText("Air")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file double_line.csv");
  await page.getByRole("button").click();
  await expect(
    page.getByText("Output: Success: double_line.csv was loaded.")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();

  await expect(page.getByText("Water")).toHaveCount(2);
  await expect(page.getByText("Fire")).toHaveCount(2);
  await expect(page.getByText("Earth")).toHaveCount(2);
  await expect(page.getByText("Air")).toHaveCount(2);

  await expect(page.getByText("New_York")).toBeVisible();
  await expect(page.getByText("Seattle")).toBeVisible();
  await expect(page.getByText("Scotsdale")).toBeVisible();
  await expect(page.getByText("Denver")).toBeVisible();

  await expect(page.getByText("New_York")).toHaveCount(1);
  await expect(page.getByText("Seattle")).toHaveCount(1);
  await expect(page.getByText("Scotsdale")).toHaveCount(1);
  await expect(page.getByText("Denver")).toHaveCount(1);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file single_line.csv");
  await page.getByRole("button").click();
  await expect(
    page.getByText("Output: Success: single_line.csv was loaded.")
  ).toHaveCount(2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();

  await expect(page.getByText("Water")).toHaveCount(3);
  await expect(page.getByText("Fire")).toHaveCount(3);
  await expect(page.getByText("Earth")).toHaveCount(3);
  await expect(page.getByText("Air")).toHaveCount(3);

  await expect(page.getByText("New_York")).toHaveCount(1);
  await expect(page.getByText("Seattle")).toHaveCount(1);
  await expect(page.getByText("Scotsdale")).toHaveCount(1);
  await expect(page.getByText("Denver")).toHaveCount(1);
});

/**
 * This test checks search in all different permutations possible,
 * including having a header given, index given, or no identifier
 * given, making sure that it displays the the search results and
 * history in both brief and verbose modes.
 */
test("search (all variants) commands show success under verbose and brief modes, no viewing", async ({
  page,
}) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file double_line.csv");
  await page.getByRole("button").click();
  await expect(
    page.getByText("Success: double_line.csv was loaded.")
  ).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Denver");
  await page.getByRole("button").click();

  await expect(page.getByText("New_York")).toHaveCount(1);
  await expect(page.getByText("Seattle")).toHaveCount(1);
  await expect(page.getByText("Scotsdale")).toHaveCount(1);
  await expect(page.getByText("Denver")).toHaveCount(1);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Output: ")).toHaveCount(3);
  await expect(page.getByText("Command: search")).toHaveCount(1);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Seattle 1");
  await page.getByRole("button").click();

  await expect(page.getByText("New_York")).toHaveCount(2);
  await expect(page.getByText("Seattle")).toHaveCount(2);
  await expect(page.getByText("Scotsdale")).toHaveCount(2);
  await expect(page.getByText("Denver")).toHaveCount(2);
  await expect(page.getByText("Output: ")).toHaveCount(4);
  await expect(page.getByText("Command: search")).toHaveCount(2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search ScotsdaleEarth");
  await page.getByRole("button").click();

  await expect(page.getByText("New_York")).toHaveCount(3);
  await expect(page.getByText("Seattle")).toHaveCount(3);
  await expect(page.getByText("Scotsdale")).toHaveCount(3);
  await expect(page.getByText("Denver")).toHaveCount(3);
  await expect(page.getByText("Output: ")).toHaveCount(5);
  await expect(page.getByText("Command: search")).toHaveCount(3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await expect(page.getByText("Output: ")).toHaveCount(0);
  await expect(page.getByText("Command: search")).toHaveCount(0);
});

/**
 * This test checks that when calling search before load, the
 * appropriate error message is given and recorded in history
 * in both brief and verbose modes.
 */
test("search commands show failure under verbose and brief modes", async ({
  page,
}) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Seattle");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await expect(page.getByText("Error: No file loaded.")).toBeVisible();

  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Command: search")).toBeVisible();
  await expect(page.getByText("Output: Error: No file loaded.")).toBeVisible();

  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Command: search")).toHaveCount(2);
  await expect(
    page.getByText(
      "Output: Error: 'search' is either an invalid command or has an invalid number of arguments."
    )
  ).toBeVisible();

  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await expect(
    page.getByText(
      "Error: 'search' is either an invalid command or has an invalid number of arguments."
    )
  ).toBeVisible();
});

/**
 * This test checks search and its integration with view, load, and mode.
 * First, it checks that a csv file was loaded and a mocked search query works.
 * Then it tests viewing the same csv and checking that the frequency of keywords is different.
 * Then it switches modes and checks that the inputs are different but in sync with the previous values.
 * Then it tries searching with two different searches and checks that the frequencies update in this new mode.
 * Then it switches mode and checks once more that the frequencies are expected.
 * Then it loads a different file, and tries to search on it.
 */
test("search commands show success under verbose and brief modes, with viewing/loading (integration)", async ({
  page,
}) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file double_line.csv");
  await page.getByRole("button").click();
  await expect(
    page.getByText("Success: double_line.csv was loaded.")
  ).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Denver");
  await page.getByRole("button").click();

  await expect(page.getByText("New_York")).toHaveCount(1);
  await expect(page.getByText("Seattle")).toHaveCount(1);
  await expect(page.getByText("Scotsdale")).toHaveCount(1);
  await expect(page.getByText("Denver")).toHaveCount(1);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  await expect(page.getByText("New_York")).toHaveCount(2);
  await expect(page.getByText("Seattle")).toHaveCount(2);
  await expect(page.getByText("Scotsdale")).toHaveCount(2);
  await expect(page.getByText("Denver")).toHaveCount(2);
  await expect(page.getByText("Water")).toHaveCount(1);
  await expect(page.getByText("Earth")).toHaveCount(1);
  await expect(page.getByText("Fire")).toHaveCount(1);
  await expect(page.getByText("Air")).toHaveCount(1);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
  await expect(page.getByText("Output: ")).toHaveCount(4);
  await expect(page.getByText("Command: search")).toHaveCount(1);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Seattle 1");
  await page.getByRole("button").click();

  await expect(page.getByText("New_York")).toHaveCount(3);
  await expect(page.getByText("Seattle")).toHaveCount(3);
  await expect(page.getByText("Scotsdale")).toHaveCount(3);
  await expect(page.getByText("Denver")).toHaveCount(3);
  await expect(page.getByText("Water")).toHaveCount(1);
  await expect(page.getByText("Earth")).toHaveCount(1);
  await expect(page.getByText("Fire")).toHaveCount(1);
  await expect(page.getByText("Air")).toHaveCount(1);
  await expect(page.getByText("Output: ")).toHaveCount(5);
  await expect(page.getByText("Command: search")).toHaveCount(2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search ScotsdaleEarth");
  await page.getByRole("button").click();

  await expect(page.getByText("New_York")).toHaveCount(4);
  await expect(page.getByText("Seattle")).toHaveCount(4);
  await expect(page.getByText("Scotsdale")).toHaveCount(4);
  await expect(page.getByText("Denver")).toHaveCount(4);
  await expect(page.getByText("Output: ")).toHaveCount(6);
  await expect(page.getByText("Water")).toHaveCount(1);
  await expect(page.getByText("Earth")).toHaveCount(1);
  await expect(page.getByText("Fire")).toHaveCount(1);
  await expect(page.getByText("Air")).toHaveCount(1);
  await expect(page.getByText("Command: search")).toHaveCount(3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await expect(page.getByText("Output: ")).toHaveCount(0);
  await expect(page.getByText("Command: search")).toHaveCount(0);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  await expect(page.getByText("New_York")).toHaveCount(5);
  await expect(page.getByText("Seattle")).toHaveCount(5);
  await expect(page.getByText("Scotsdale")).toHaveCount(5);
  await expect(page.getByText("Denver")).toHaveCount(5);
  await expect(page.getByText("Water")).toHaveCount(2);
  await expect(page.getByText("Earth")).toHaveCount(2);
  await expect(page.getByText("Fire")).toHaveCount(2);
  await expect(page.getByText("Air")).toHaveCount(2);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file single_line.csv");
  await page.getByRole("button").click();
  await expect(
    page.getByText("Success: single_line.csv was loaded.")
  ).toHaveCount(1);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  await expect(page.getByText("New_York")).toHaveCount(5);
  await expect(page.getByText("Seattle")).toHaveCount(5);
  await expect(page.getByText("Scotsdale")).toHaveCount(5);
  await expect(page.getByText("Denver")).toHaveCount(5);
  await expect(page.getByText("Water")).toHaveCount(3);
  await expect(page.getByText("Earth")).toHaveCount(3);
  await expect(page.getByText("Fire")).toHaveCount(3);
  await expect(page.getByText("Air")).toHaveCount(3);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Air");
  await page.getByRole("button").click();
  await expect(page.getByText("New_York")).toHaveCount(5);
  await expect(page.getByText("Seattle")).toHaveCount(5);
  await expect(page.getByText("Scotsdale")).toHaveCount(5);
  await expect(page.getByText("Denver")).toHaveCount(5);
  await expect(page.getByText("Water")).toHaveCount(3);
  await expect(page.getByText("Earth")).toHaveCount(3);
  await expect(page.getByText("Fire")).toHaveCount(3);
  await expect(page.getByText("Air")).toHaveCount(3);
});
