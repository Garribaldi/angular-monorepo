const {readCachedProjectConfiguration } = require('nx/src/project-graph/project-graph');
const nxPreset = require("@nrwl/jest/preset").default;

const currentModuleName = process.env.NX_TASK_TARGET_PROJECT;
const workspaceRoot = process.env.NX_WORKSPACE_ROOT;

const configuration = readCachedProjectConfiguration(currentModuleName);
const moduleFolder = configuration.sourceRoot.replace('/src', '');
const junitOutputDirectory = `${workspaceRoot}/coverage/${moduleFolder}`;

module.exports = {
  ...nxPreset,
  coverageReporters: ['lcov', 'text', 'text-summary'],
  reporters: [
    'default',
    ['jest-junit', {outputDirectory: junitOutputDirectory, outputName: 'junit.xml'}]
  ]
};
