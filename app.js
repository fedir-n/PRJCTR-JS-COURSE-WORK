'use strict';

class Page {
  constructor() {
    this.buttonFirstTab = document.querySelector('#tab-button1');
    this.buttonSecondTab = document.querySelector('#tab-button2');
    this.firstTab = document.querySelector('#tab1');
    this.secondTab = document.querySelector('#tab2');
    this.firstDateInput = document.querySelector('#input-date1');
    this.secondDateInput = document.querySelector('#input-date2');
    this.presetWeekBtn = document.querySelector('.btn-preset7');
    this.presetMonthBtn = document.querySelector('.btn-preset30');
    this.dayTypesInput = document.querySelector('#day-types');
    this.counterTypesInput = document.querySelector('#counter-types');
    this.submitBtn = document.querySelector('#btn-form1');
    this.responseOutput = document.querySelector('.form1-response');
    this.historyTable = document.querySelector('.history-table table');
  }
}

class TabsBar extends Page {
  changeTab = function (destTab, currentTab) {
    this[destTab].removeAttribute('disabled');
    this[currentTab].setAttribute('disabled', 'true');
    this.firstTab.classList.toggle('hidden');
    this.secondTab.classList.toggle('hidden');
  };
}

class FirstTab extends Page {
  setMinDate = function (date) {
    this.secondDateInput.setAttribute('min', date);
  };

  //YOU STOPPED HERE; TRY TO VALIDATE DATE INPUT
  setMaxDate = function (date) {
    if (
      date.getDate().getFullYear() >= 1980 &&
      date.getDate().getFullYear() <= 2049
    ) {
      this.firstDateInput.setAttribute('max', date);
    }
  };
  setPeset = function (days) {
    const date = new Date();
    this.secondDateInput.value = date.toLocaleDateString('en-CA');
    date.setDate(date.getDate() - days);
    this.firstDateInput.value = date.toLocaleDateString('en-CA');
  };
  calculateDates = function (startDate, endDate, dayType, counterType) {
    console.log(startDate);
    console.log(endDate);
    console.log(dayType);
    console.log(counterType);

    if (startDate == 0 || endDate == 0) {
      this.responseOutput.classList.remove('hidden');
      this.responseOutput.innerHTML = 'ERROR';
    }
  };
}

export { TabsBar, FirstTab };
