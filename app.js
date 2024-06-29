'use strict';

class TabsBar {
  constructor() {
    this.buttonFirstTab = document.querySelector('#tab-button1');
    this.buttonSecondTab = document.querySelector('#tab-button2');
    this.firstTab = document.querySelector('#tab1');
    this.secondTab = document.querySelector('#tab2');
  }
  changeTab = function () {
    this.buttonFirstTab.classList.toggle('tab-button-selected');
    this.buttonFirstTab.classList.toggle('tab-button');
    this.buttonSecondTab.classList.toggle('tab-button-selected');
    this.buttonSecondTab.classList.toggle('tab-button');
    this.buttonFirstTab.toggleAttribute('disabled');
    this.buttonSecondTab.toggleAttribute('disabled');
    this.firstTab.classList.toggle('hidden');
    this.secondTab.classList.toggle('hidden');
  };
}

class FirstTab {
  constructor() {
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

  dateFieldValidator = function (selectedDate) {
    const date = new Date(selectedDate);
    if (date.getFullYear() <= 1980 || date.getFullYear() >= 2049) {
      this.#displayMessage('Введіть дату в проміжку між 1980 та 2049 роком!');
      //TODO: Remove the field value
      //TODO: Add red border
    } else if (selectedDate == 0) {
      this.#displayMessage('Введіть дату!');
      //TODO: Remove the field value
      //TODO: Add red border
    } else {
      //TODO: Remove red border if exist
      return true;
    }
  };

  setDateAttribut = function (field, attr, selectedDate) {
    const date = new Date(selectedDate);
    this[field].setAttribute(attr, selectedDate);
  };

  setPeset = function (days) {
    const date = new Date();
    this.secondDateInput.value = date.toLocaleDateString('en-CA');
    date.setDate(date.getDate() - days);
    this.firstDateInput.value = date.toLocaleDateString('en-CA');
  };

  calculateDates = function () {
    const startDate = new Date(this.firstDateInput.value);
    const endDate = new Date(this.secondDateInput.value);
    const dayType = this.dayTypesInput.value;
    const counterType = this.counterTypesInput.value;
    let currentDate = new Date(startDate);
    let dates = [];
    let res = null;
    let unit = null;

    //create dates array
    if (dayType === 'all') {
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (dayType === 'weekday') {
      while (currentDate <= endDate) {
        if (this.#isWeekday(currentDate)) {
          dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (dayType === 'holiday') {
      while (currentDate <= endDate) {
        if (!this.#isWeekday(currentDate)) {
          dates.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    //TODO: Add singular forms for units
    if (counterType === 'day') {
      res = dates.length;
      unit = 'днів';
    } else if (counterType === 'hour') {
      res = dates.length * 24;
      unit = 'годин';
    } else if (counterType === 'min') {
      res = dates.length * 24 * 60;
      unit = 'хвилин';
    } else if (counterType === 'sec') {
      res = dates.length * 24 * 60 * 60;
      unit = 'секунд';
    }
    this.#displayMessage(`${res} ${unit}`);
    this.#addTableRow(startDate, endDate, `${res} ${unit}`);
  };

  #isWeekday = function (date) {
    return date.getDay() % 6 !== 0;
  };

  #displayMessage = function (text) {
    this.responseOutput.classList.remove('hidden');
    this.responseOutput.innerHTML = text;
  };

  #addTableRow = function (startDate, endDate, res) {
    this.historyTable.innerHTML += `<tr>
            <th>${startDate.toLocaleDateString('en-CA')}</th>
            <th>${endDate.toLocaleDateString('en-CA')}</th>
            <th>${res}</th>
          </tr>`;
  };
}

export { TabsBar, FirstTab };
