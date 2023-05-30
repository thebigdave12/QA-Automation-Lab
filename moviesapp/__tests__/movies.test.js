const {Builder, Browser, By, until} = require('selenium-webdriver')

let driver; 

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build()
    await driver.get("http://localhost:3001/");
});

afterEach(async () => {
    await driver.quit()
})


test("Watch Button Message", async () => {

    await driver.findElement(By.name('movieTitle')).sendKeys('Lord of the Rings: Fellowship of the Ring');
    await driver.sleep(2000)
    await driver.findElement(By.css('button[type="submit"]')).click()
    await driver.sleep(2000)

    const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)

    expect(await addedMovie.getText()).toBe("Lord of the Rings: Fellowship of the Ring")
    
    await driver.sleep(2000)
    await driver.findElement(By.css('input[type="checkbox"]')).click()
    await driver.sleep(2000)

    const watchedMovie = driver.wait(until.elementLocated(By.css('input[id="movie-0"')), 1000)
    expect(await watchedMovie.isSelected()).toBe(true)
})

test("Delete Button Message Notification", async () => {

    await driver.findElement(By.name('movieTitle')).sendKeys('Lord of the Rings: Fellowship of the Ring');
    await driver.sleep(2000)
    await driver.findElement(By.css('button[type="submit"]')).click()
    await driver.sleep(2000)

    const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)

    
    await driver.sleep(2000)
    await driver.findElement(By.css('button.delete-btn')).click()
    

    const deleteMovieMessage = driver.wait(until.elementLocated(By.css('aside[id="message"]')), 1000)
    expect(await deleteMovieMessage.getText()).toBe("Lord of the Rings: Fellowship of the Ring deleted!")
})

test("Watched Button Message Notification", async () => {

    await driver.findElement(By.name('movieTitle')).sendKeys('Lord of the Rings: Fellowship of the Ring');
    await driver.sleep(2000)
    await driver.findElement(By.css('button[type="submit"]')).click()
    await driver.sleep(2000)

    const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)

    
    await driver.sleep(2000)
    await driver.findElement(By.css('input[type="checkbox"]')).click()
    

    const watchedMovieMessage = driver.wait(until.elementLocated(By.css('aside[id="message"]')), 1000)
    expect(await watchedMovieMessage.getText()).toBe("Watched Lord of the Rings: Fellowship of the Ring....")
})

// test("Delete Button", async () => {

//     await driver.findElement(By.name('movieTitle')).sendKeys('Lord of the Rings: Fellowship of the Ring');
//     await driver.sleep(2000)
//     await driver.findElement(By.css('button[type="submit"]')).click()
//     await driver.sleep(2000)

//     const addedMovie = await driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)

    
//     await driver.sleep(2000)
//     await driver.findElement(By.css('button.delete-btn')).click()
    

//     const deleteMovie = driver.wait(until.elementLocated(By.css('label[for="movie-0"]')), 1000)
//     expect(await deleteMovie.isSelected()).toBe(false)
// })