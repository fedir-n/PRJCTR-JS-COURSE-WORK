'use strict';

import { FirstTab } from './app.js';
import { TabsBar } from './app.js';

const firstTab = new FirstTab();
const tabsBar = new TabsBar();

//set min value for start date
firstTab.firstDateInput.addEventListener('change', () => {
  firstTab.setMinDate(firstTab.firstDateInput.value);
});
//set max value for end date
firstTab.secondDateInput.addEventListener('change', () => {
  firstTab.setMaxDate(firstTab.secondDateInput.value);
});
//preset 7 days
firstTab.presetWeekBtn.addEventListener('click', () => {
  firstTab.setPeset(7);
});
//preset 30 days
firstTab.presetMonthBtn.addEventListener('click', () => {
  firstTab.setPeset(30);
});
//calculate
firstTab.submitBtn.addEventListener('click', () => {
  firstTab.calculateDates(
    firstTab.firstDateInput.value,
    firstTab.secondDateInput.value,
    firstTab.dayTypesInput.value,
    firstTab.counterTypesInput.value
  );
});

//tabs switch
tabsBar.buttonFirstTab.addEventListener('click', () => {
  tabsBar.changeTab('buttonSecondTab', 'buttonFirstTab');
});
tabsBar.buttonSecondTab.addEventListener('click', () => {
  tabsBar.changeTab('buttonFirstTab', 'buttonSecondTab');
});
console.log(tabsBar);
