import { equal } from "assert";
import { Builder, By } from "selenium-webdriver";

const localUrl = "http://localhost:5173/";

describe("System Tests", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  it('Page title sould be "To-Watch"', async function () {
    await driver.get(localUrl);

    let title = await driver.getTitle();
    equal("To-Watch", title);
  });

  after(async () => await driver.quit());
});
