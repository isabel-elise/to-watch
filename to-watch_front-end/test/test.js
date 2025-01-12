import { equal, notEqual } from "assert";
import { Builder, By, until } from "selenium-webdriver";
import { exec, spawn } from "child_process";

const localUrl = "http://localhost:5173/";

async function executeCommand(cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);

      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);

      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

function installRequirements() {
  executeCommand(
    "cd .. && pip install --upgrade pip && pip install -r to-watch_back-end/requirements.txt"
  );
  return new Promise((resolve) => setTimeout(() => resolve(), 8000));
}

function initializeDatabase() {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(spawn("python3", ["../to-watch_back-end/app.py"])),
      6000
    )
  );
}

function initializeUserInterface() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(spawn("vite"), 4000))
  );
}

describe("System Tests", function () {
  let driver, dbProcess, uiProcess;

  before(async function () {
    uiProcess = await initializeUserInterface().then((uip) => uip);
    dbProcess = await installRequirements()
      .then(() => initializeDatabase())
      .then((dbp) => dbp);
    driver = new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
    await dbProcess.kill();
    await uiProcess.kill("SIGTERM");
  });

  it('Page title sould be "To-Watch"', async function () {
    await driver.get(localUrl);

    let title = await driver.getTitle();
    equal("To-Watch", title);
  });

  it("Search for Matrix movie should return results with 'Matrix' in title", async function () {
    let searchBarInput = await driver.findElement(By.id("search-input"));
    //await driver.wait(until.elementIsVisible(searchBarInput), 100);
    await searchBarInput.sendKeys("Matrix");
    await searchBarInput.sendKeys("\n");
    await driver.sleep(3000);
    let searchResults = await driver.findElements(
      By.className("search-result-title")
    );
    let searchResultsTitles = await Promise.all(
      searchResults.map((e) => e.getText())
    );
    notEqual(
      0,
      searchResultsTitles.filter((a) => textContainsWord(a, "Matrix"))
    );
  });
});

function textContainsWord(text, word) {
  return text.indexOf(word) !== -1;
}
