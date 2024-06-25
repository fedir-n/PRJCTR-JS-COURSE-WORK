'use strict';
Element.prototype.toggleMultiple = function (prop) {
  for (var i = 0, len = prop.length; i < len; i++) {
    this.classList.toggle(prop[i]);
  }
};

class Page {
  constructor() {
    //tabs
    this.buttonFirstTab = document.querySelector('#tab-button1');
    this.buttonSecondTab = document.querySelector('#tab-button2');
    //first tab
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
    //second tab
    //
  }
}

class TabsBar extends Page {
  changeTab = function () {
    const clButton = ['tab-button-selected', 'tab-button'];
    const clTab = ['hidden'];
    const attrButton = ['disabled'];
    this.buttonFirstTab.toggleMultiple(clButton);
    this.buttonSecondTab.toggleMultiple(clButton);
    this.buttonFirstTab.toggleAttribute(attrButton);
    this.buttonSecondTab.toggleAttribute(attrButton);
    this.firstTab.toggleMultiple(clTab);
    this.secondTab.toggleMultiple(clTab);
  };
}

class FirstTab extends Page {
  #displayMessage = function (text) {
    this.responseOutput.classList.remove('hidden');
    this.responseOutput.innerHTML = text;
  };

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
  // calculateDates = function (startDate, endDate, dayType, counterType) {};
}

export { TabsBar, FirstTab };
