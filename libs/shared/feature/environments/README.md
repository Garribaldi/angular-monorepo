# shared-environments

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test shared-environments` to execute the unit tests.

## Setup

An [environment.common.ts](./src/lib/environment.common.ts) is used to provide a base configuration.
In this file, the value are read from Node environment variables. This is achieved by a custom webpack configuration.

For more information, read [NX Docs](https://nx.dev/recipes/environment-variables/use-environment-variables-in-angular).

For every stage, there is a separate environment file which destructs the common file and overwrites values for specific properties.

## Usage

It is not recommended to import the environemnt file directly. Instead, inject the _environemnt.service_.ts. 
You can then access every property from your enviroment file as a readonly value. 
This prevents the unintentional mutation of the environment configuration data.
