export const getTable = () => cy.getEl('generic-table');
export const getForm = () => cy.getEl('reactive-form');
export const getDataGridColumns = () => cy.findPartial('data-grid-filter-for-');
export const getDataGridTable = () => cy.getEl('data-grid-table');
export const getDataGridChipsBar = () => cy.getEl('data-grid-chips-bar');
export const getCaptchaV2 = () => cy.getEl('captcha-v2-container');
