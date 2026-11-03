# CashApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

The application now uses the coordinated Angular 21/Material 21/TypeScript 5.9
toolchain. Use Node.js 22.12 or newer and install with `npm ci`.
Run `npm run build` and
`npm test -- --watch=false --browsers=ChromeHeadless` to validate it.
Tests stub transaction API calls and do not use a live financial database.

### Existing backend limitation

The transaction status endpoint (`PUT /api/transactions/:_id`) currently only
looks up a record and returns its identifier. It does **not** persist status
changes. The UI can show an optimistic status change, but a successful response
must not be treated as confirmation that the change was saved. Backend
persistence is deliberately outside this toolchain repair.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
