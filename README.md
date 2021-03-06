<h1 align="center">Progressive Budget Tracker</h1>
<h2 align="center">MongoDB, IndexedDB, Service Worker & Manifest</h2>

## Description

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](http://choosealicense.com/licenses/mit/)

This application allows a user to maintain visibility of their budget even when they are without internet connection. Data is persisted by a MongoDB backend and leverages IndexedDB for caching "offline" transactions. The application is deployed to Heroku and can be found here: [Budget Tracker](https://radiant-wave-66486.herokuapp.com/)

![The homepage for the budget tracker shows a title indicating the current total budget, a form to enter new deposits or expenses and a table and chart providing views of historical transactions.](./assets/BudgetTracker.png)

## Table of Contents

- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Questions](#questions)

## Usage

[Budget Tracker](https://radiant-wave-66486.herokuapp.com/)

This progressive web application presents the user's current budget with a form providing the ability to add new deposit (Add Funds) or expense (Subtract Funds) transactions. Historical transactions are shown in both a table and chart. The main feature of this PWA is that it still functions if the user is without internet connection. "Offline" transactions are recorded into an IndexedDB and synced back to the backing MongoDB via a service worker once network connectivity is restored.

## License

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](http://choosealicense.com/licenses/mit/)

This application is covered under the MIT license. Information about this license can be found [here](http://choosealicense.com/licenses/mit/).

## How to Contribute

[MichaelHermes](https://github.com/MichaelHermes)

## Questions?

Find me on [Github](https://github.com/MichaelHermes) or email me at [mikehermes87@gmail.com](mailto:mikehermes87@gmail.com).
