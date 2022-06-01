# App2 (HN Search)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

```
ng new app --skip-git
github understanding-tailwind

tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

ng generate module core --module=app
ng generate service core/services/data --skip-tests --dry-run
ng generate service core/services/logger --skip-tests --dry-run

ng generate module shared --module=app
ng generate component shared/components/peak --module=shared --dry-run
ng generate component shared/components/page-not-found --module=shared -is -it --skip-tests --dry-run
ng generate pipe shared/pipes/decode-html-entities --module=shared --skip-tests --dry-run
ng generate pipe shared/pipes/date-ago --module=shared --skip-tests --dry-run
(markdown, npm install marked)(ngx-pagination)

ng generate module layout --module=app
ng generate component layout/layouts/layout-app --module=layout
ng generate component layout/layouts/layout-default --module=layout
ng generate component layout/components/footer --module=layout

ng generate module hn --module=app --routing
```

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
