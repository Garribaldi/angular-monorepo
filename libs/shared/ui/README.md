# shared-ui

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test shared-ui` to execute the unit tests.

## Add Library

```
nx g @nrwl/angular:lib data-access --prefix=generic-table --directory=generic-table
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


