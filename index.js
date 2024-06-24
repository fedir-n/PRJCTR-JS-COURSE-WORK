'use strict';

import { FirstTab } from './app.js';
import { TabsBar } from './app.js';

const firstTab = new FirstTab();
const tabsBar = new TabsBar();

//tabs switch
tabsBar.buttonFirstTab.addEventListener('click', () => {
  tabsBar.changeTab();
});
tabsBar.buttonSecondTab.addEventListener('click', () => {
  tabsBar.changeTab();
});

//set min value for start date
firstTab.firstDateInput.addEventListener('focusout', () => {
  firstTab.setDateAttribut(
    'secondDateInput',
    'min',
    firstTab.firstDateInput.value
  );
});
//set max value for end date
firstTab.secondDateInput.addEventListener('focusout', () => {
  firstTab.setDateAttribut(
    'firstDateInput',
    'max',
    firstTab.secondDateInput.value
  );
});

//preset 7 days
firstTab.presetWeekBtn.addEventListener('click', () => {
  firstTab.setPeset(7);
  firstTab.setDateAttribut(
    'secondDateInput',
    'min',
    firstTab.firstDateInput.value
  );
  firstTab.setDateAttribut(
    'firstDateInput',
    'max',
    firstTab.secondDateInput.value
  );
});
//preset 30 days
firstTab.presetMonthBtn.addEventListener('click', () => {
  firstTab.setPeset(30);
  firstTab.setDateAttribut(
    'secondDateInput',
    'min',
    firstTab.firstDateInput.value
  );
  firstTab.setDateAttribut(
    'firstDateInput',
    'max',
    firstTab.secondDateInput.value
  );
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
