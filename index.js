'use strict';

import { TabsBar, FirstTab, SecondTab } from './app.js';
import { countriesMock } from './mockData.js';

const tabsBar = new TabsBar();
const firstTab = new FirstTab();
const secondTab = new SecondTab();

//TABS SWITCH
const tab =
  localStorage.getItem('tabNumber') !== null
    ? localStorage.getItem('tabNumber')
    : `1`;
switch (tab) {
  case '1':
    break;
  case '2':
    tabsBar.changeTab();
}

tabsBar.buttonFirstTab.addEventListener('click', () => {
  tabsBar.changeTab();
  tabsBar.addToLocalStorage(1);
});
tabsBar.buttonSecondTab.addEventListener('click', () => {
  tabsBar.changeTab();
  tabsBar.addToLocalStorage(2);
});

//FIRST TAB

firstTab.getFromLocalStorage();

//set min value for start date
firstTab.firstDateInput.addEventListener('focusout', () => {
  if (firstTab.dateFieldValidator(firstTab.firstDateInput.value)) {
    firstTab.setDateAttribut(
      'secondDateInput',
      'min',
      firstTab.firstDateInput.value
    );
  }
});
//set max value for end date
firstTab.secondDateInput.addEventListener('focusout', () => {
  if (firstTab.dateFieldValidator(firstTab.secondDateInput.value)) {
    firstTab.setDateAttribut(
      'firstDateInput',
      'max',
      firstTab.secondDateInput.value
    );
  }
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

// calculate
firstTab.submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (
    firstTab.dateFieldValidator(firstTab.secondDateInput.value) &&
    firstTab.dateFieldValidator(firstTab.firstDateInput.value)
  ) {
    firstTab.calculateDates();
  }
});

//SECOND TAB
secondTab.getFromLocalStorage();

// const jsonCountries = countriesMock;
let jsonCountries = null;
document.addEventListener('DOMContentLoaded', () => {
  secondTab
    .getCountries()
    .then((countries) => {
      jsonCountries = countries;
      console.log(countries);
    })
    .catch((error) => {
      secondTab.displayMessage(error);
      throw new Error(error);
    });
});

secondTab.countrySearch.addEventListener('keyup', (event) => {
  console.log('search:', jsonCountries);
  const countries = secondTab.filterCountries(
    jsonCountries,
    event.target.value
  );
  secondTab.addToCountriesList(countries);
  secondTab.countriesList.classList.add('show');
});

secondTab.countrySearch.addEventListener('blur', (event) => {
  setTimeout(() => {
    secondTab.countriesList.classList.remove('show');

    if (event.target.value.trim()) {
      secondTab.yearInput.removeAttribute('disabled');
    } else {
      secondTab.yearInput.setAttribute('disabled', '');
    }
  }, 200);
});

secondTab.countriesList.addEventListener('click', (event) => {
  secondTab.countrySearch.value = event.target.textContent;
});

secondTab.submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  secondTab.getHolidays(jsonCountries);
});

secondTab.yearInput.addEventListener('wheel', () => {});
