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
      4000
    )
  );
}

function installDependecies() {
  executeCommand("npm install");
  return new Promise((resolve) => setTimeout(() => resolve(), 6000));
}

function initializeUserInterface() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(spawn("vite"), 2000))
  );
}

describe("System Tests", function () {
  let driver, dbProcess, uiProcess;

  before(async function () {
    uiProcess = await installDependecies()
      .then(() => initializeUserInterface())
      .then((uip) => uip);
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

  it("Searching for 'Matrix' movie should return results with 'Matrix' in title", async function () {
    let searchBarInput = await driver.findElement(By.id("search-input"));

    await searchBarInput.sendKeys("Matrix");
    await searchBarInput.sendKeys("\n");

    await driver.sleep(3000);

    let searchResultsTitles = await driver.findElements(
      By.className("search-result-title")
    );

    let searchResultsTitlesText = await Promise.all(
      searchResultsTitles.map((e) => e.getText())
    );

    notEqual(
      0,
      searchResultsTitlesText.filter((a) => textContainsWord(a, "Matrix"))
        .length
    );
  });

  it("Selecting a search result should bring up the movie information card with its title and imdb score", async function () {
    let searchResults = await driver.findElements(
      By.className("search-result")
    );

    let searchResult = searchResults[0];
    let searchResultTitle = await searchResult
      .findElement(By.className("search-result-title"))
      .getText();
    await searchResult.click();

    await driver.sleep(7000);

    let selectedMovieContainer = await driver.findElement(
      By.className("selected-movie-container")
    );

    let selectedMovieTitle = await selectedMovieContainer
      .findElement(By.className("movie-title"))
      .getText();

    let selectedMovieIMDBScore = await selectedMovieContainer
      .findElement(By.className("imdb-score"))
      .getText();

    equal(searchResultTitle, selectedMovieTitle);
    notEqual(0, selectedMovieIMDBScore.length);
  });

  it("Creating a new list and selecting should be display the recentrly created list title", async function () {
    let createListButton = await driver.findElement(By.id("create-list"));
    await createListButton.click();

    await driver.sleep(1000);

    let listNameInput = await driver.findElement(By.id("list-name-input"));
    await listNameInput.sendKeys("Clássicos");

    let addListButton = await driver.findElement(By.id("add-list"));
    //await addListButton.click();

    await driver.sleep(2000);

    let avaiableLists = await driver.findElements(By.className("select-list"));
    let lastAddedList = avaiableLists[avaiableLists.length - 1];
    await lastAddedList.click();

    await driver.sleep(1000);

    let selectedListTitle = await driver
      .findElement(By.id("list-title"))
      .then((element) => element.getText());

    equal(selectedListTitle, "Clássicos");
  });
});

function textContainsWord(text, word) {
  return text.indexOf(word) !== -1;
}
