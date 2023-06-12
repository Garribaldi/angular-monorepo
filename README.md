# Local

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Project setup afer cloning




## ToDos
- migrate from moment.js to **Day.js** (https://www.npmjs.com/package/dayjs)
- update to Angular 16
- update to Nx 16

## Development server

Run `nx serve demo` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Setup Project

After cloning from repository, run ``npm install`` and after that, run ``npm dedupe``.

Angular and a custom webpack which uses the Define plugin run into issues because of mismatching versions ob webpack.
Such a config is used in ``apps/demo/webpack.config.js``.

Building the project results in an error __"Error: Module parse failed: parser.destructuringAssignmentPropertiesFor is not a function..."__.
``@angular-devkit/build-angular`` depends on webpack@5.76.1, while every other dependency uses a newer version.

You can visualize this mismatch with ``npm list webpack``.

With dedupe you "downgrade" every dependency to webpack@5.76.1.

An update to a newer Angular versions in the near future should fix this error so this worlaround becomes obsolete.

To use all examples properly, it is necessary to provide some environment data.

To achieve this, add an __.env__ file in your app base directory (under `apps/demo/`).

Add the following keys to this file and provide your individual values:

```
  APP_GOOGLE_CAPTCHA_V2_KEY=
  APP_GOOGLE_CAPTCHA_V3_KEY=
  APP_GOOGLE_API_KEY=
  APP_GOOGLE_PROJECT_ID=
  APP_GOOGLE_CAPTCHA_REST_API=https://recaptchaenterprise.googleapis.com/v1/projects/PROJECT_ID/assessments?key=API_KEY
```

Many pages need sample data to make them work. This is loaded via API Endpoints from a dedicated backend. 

For this purpose, clone [https://github.com/Garribaldi/local-service](https://github.com/Garribaldi/local-service), build it and let it run on Port 8080.

## Add Library

```
nx g @nrwl/angular:lib feature --prefix=local-angular-material --tags="scope:angular-material, type:feature" --directory=angular-material --routing=true --lazy=true
```

## Move Library

```
nx g @nrwl/angular:move --project shared-ui --destination generic-table/ui
```

## Add Component

```
nx g @nrwl/angular:component table --prefix=local-shared --project=shared-ui --export=true
```

## Add Component without folder

```
nx g @nrwl/angular:component table --project=shared-ui --export=true --flat
```

## Add Service

```
nx g @nrwl/angular:service api/table-data --project=generic-table-data-access
```

## Add Directive

```
nx g @schematics/angular:directive directives/cypress-selector --prefix=local-shared --project=shared-utils --export=true
```

## Add Pipe

```
nx g @schematics/angular:pipe pipes/add-value --project=shared-utils --export=true
```

## Add Interceptor
```
nx g @schematics/angular:interceptor interceptors/http-cache --project=shared-utils
```

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
