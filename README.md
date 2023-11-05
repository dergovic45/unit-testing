# General

This project is here to demonstrate examples for unit tests.

# Changelog

- 05.11.2023 → Added readme file and changed testing framework to jest, see
    - https://dev.to/this-is-angular/migrate-from-jasmine-to-jest-and-testing-in-angular-286i
    - https://jestjs.io/docs/getting-started
    - https://www.npmjs.com/package/ts-jest
    - https://www.npmjs.com/package/jest-environment-jsdom

# Project download guide

## Windows

- You need Node.js to install [the package dependencies](package.json)
    - It can be downloaded directly → https://nodejs.org/en/download
        - Installing the LTS version is recommended
    - Alternatively NVM (Node Version Manager) can be used
        - Go to https://github.com/coreybutler/nvm-windows/releases
        - Install it using latest nvm-setup.exe and select "C:\tools\nvm" as install directory for NVM
        - Press Windows Key + R and run "cmd" (without quotes)
        - `nvm install 20.9.0`
        - `nvm use 20.9.0`
        - ^ this will install Node.js version 20.9.0 (LTS version as of 05. November 2023)
    - Once Node.js is installed you can check for it's availability
        - Press Windows Key + R and run "cmd" (without quotes)
        - Execute `node -v` and `npm -v` which will print out version numbers
- Next you need Git to import this repository to your file system
    - It can be downloaded from https://git-scm.com/downloads
    - Install it using the 64 bit installer (.exe)
    - Once done open Git Bash and execute the following statements
        - `cd C:/`
        - `mkdir projects`
        - `cd projects`
        - `git clone git@github.com:dergovic45/unit-testing.git`
        - `cd unit-testing`
- After importing the repository you can pull the latest examples and install the dependencies
     - Open Git Bash and execute
         - `cd C:/projects/unit-testing`
         - `git pull`
     - If you have local changes you want to discard you can use `git reset --hard` before `git pull` with Git Bash
     - Press Windows Key + R and run "cmd" (without quotes) and execute
         - `cd C:\projects\unit-testing`
         - `npm install`
- Now you are done

## Mac

TBD

# Running the tests

## Windows

- You can run the tests from console
    - Press Windows Key + R and run "cmd" (without quotes) and execute
        - `cd C:\projects\unit-testing`
        - `npm run build`
        - `npm test`
    - Ideally the build command will be successful (to see if code compiles) and the test command will print you useful information
- Jest allows you to filter for tests to run with -t command
    - For example execute `npx jest -t "Async promises"`
    - To be even more specific and target a single test `npx jest -t "Calculator should add two numbers"`
- Additionally you can run tests in watch mode to see modifications in console as you change files
    - `npx jest --watch`
- If you are curious about the code itself you can explore it with an IDE
    - For example VSCode can be used → https://code.visualstudio.com/
    - After installing it you can open the project with File → Open Folder

## Mac

TBD