# Local

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Development server

Run `nx serve demo` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Add Library

```
nx g @nrwl/angular:lib shell --prefix=angular-material --directory=angular-material/feature --routing=true --lazy=true
```

## Add Component

```
nx g @nrwl/angular:component table --prefix=shared --project=shared-ui --export=true
```

## Add Service

```
nx g @nrwl/angular:service api/table-data --project=generic-table-data-access
```

## Add Directive

```
nx g @schematics/angular:directive table/table-row-template --prefix=shared --project=shared-ui --export=true
```

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
