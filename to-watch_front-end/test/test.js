import { equal } from "assert";
import { Builder, By } from "selenium-webdriver";
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
  return new Promise((resolve) => setTimeout(() => resolve(), 5000));
}

function initializeDatabase() {
  return new Promise((resolve) =>
    setTimeout(
      () => resolve(spawn("python3", ["../,,/to-watch_back-end/app.py"])),
      5000
    )
  );
}

function initializeUserInterface() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(spawn("vite"), 2000))
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

  it('Page title sould be "To-Watch"', async function () {
    await driver.get(localUrl);

    let title = await driver.getTitle();
    equal("To-Watch", title);
  });

  after(async () => {
    await driver.quit();
    await dbProcess.kill();
    await uiProcess.kill("SIGTERM");
  });
});
