const {readCachedProjectConfiguration } = require('nx/src/project-graph/project-graph');
const nxPreset = require("@nrwl/jest/preset").default;

let junitOutputDirectory = 'coverage';

const currentModuleName = process.env.NX_TASK_TARGET_PROJECT;
const workspaceRoot = process.env.NX_WORKSPACE_ROOT;

if (currentModuleName && workspaceRoot) {
  const configuration = readCachedProjectConfiguration(currentModuleName);
  const moduleFolder = configuration.sourceRoot.replace('/src', '');
  junitOutputDirectory = `${workspaceRoot}/coverage/${moduleFolder}`;
}

module.exports = {
  ...nxPreset,
  coverageReporters: ['lcov', 'text', 'text-summary'],
  reporters: [
    'default',
    ['jest-junit', {outputDirectory: junitOutputDirectory, outputName: 'junit.xml'}]
  ]
};
