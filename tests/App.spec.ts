import { test, expect } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("mode changes when inputting mode", async ({ page }) => {
  await expect(page.getByRole("button")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();
  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();

  await expect(
    page.getByRole("button", { name: "Submit; Mode: brief" })
  ).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button").click();

  await expect(
    page.getByRole("button", { name: "Submit; Mode: verbose" })
  ).toBeVisible();
});

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
});

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

test("load and view commands work with data that's not uniform in dimension", async ({
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
    await expect(page.getByText("Output: Success: messedup.csv was loaded.")).toHaveCount(
    1
  );
});

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
  await expect(page.getByText("Output: Success: single_line.csv was loaded.")).toHaveCount(2);

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
