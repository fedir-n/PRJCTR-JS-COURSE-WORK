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

  addToLocalStorage = function (number) {
    localStorage.setItem('tabNumber', number);
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
    this.historyTable = document.querySelector('.history-table');
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
    date.setDate(date.getDate() - days + 1);
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
    switch (dayType) {
      case 'all':
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
      case 'weekday':
        while (currentDate <= endDate) {
          if (this.#isWeekday(currentDate)) {
            dates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
      case 'holiday':
        while (currentDate <= endDate) {
          if (!this.#isWeekday(currentDate)) {
            dates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        break;
    }
    // TODO: Add singular forms for units
    //counter type selection
    switch (counterType) {
      case 'day':
        res = dates.length;
        unit = 'днів';
        break;
      case 'hour':
        res = dates.length * 24;
        unit = 'годин';
        break;
      case 'min':
        res = dates.length * 24 * 60;
        unit = 'хвилин';
        break;
      case 'sec':
        res = dates.length * 24 * 60 * 60;
        unit = 'секунд';
        break;
      default:
        this.#displayMessage('Не обрана одиниця виміру!');
    }

    this.#displayMessage(`${res} ${unit}`);
    this.#addTableRow(
      startDate.toLocaleDateString('en-CA'),
      endDate.toLocaleDateString('en-CA'),
      `${res} ${unit}`
    );
    this.#addToLocalStorage(
      startDate.toLocaleDateString('en-CA'),
      endDate.toLocaleDateString('en-CA'),
      `${res} ${unit}`
    );
  };

  getFromLocalStorage = function () {
    const data = localStorage.getItem('tableData');
    const dates = data !== null ? JSON.parse(data) : [];
    dates.forEach((date) => {
      this.#addTableRow(date.startDate, date.endDate, date.result);
    });
  };

  #isWeekday = function (date) {
    return date.getDay() % 6 !== 0;
  };

  #displayMessage = function (text) {
    this.responseOutput.classList.remove('hidden');
    this.responseOutput.innerHTML = text;
  };

  #addTableRow = function (startDate, endDate, res) {
    this.historyTable.classList.remove('hidden');
    this.historyTable.innerHTML += `<tr>
            <td>${startDate}</td>
            <td>${endDate}</td>
            <td>${res}</td>
          </tr>`;
  };

  #addToLocalStorage = function (startDate, endDate, res) {
    const data = localStorage.getItem('tableData');
    const dates = data !== null ? JSON.parse(data) : [];
    dates.push({
      startDate: startDate,
      endDate: endDate,
      result: res,
    });
    localStorage.setItem('tableData', JSON.stringify(dates));
  };
}

class SecondTab {
  #API_KEY;
  constructor(API_KEY) {
    this.countrySearch = document.querySelector('.dropdown-country');
    this.countriesList = document.querySelector('.country-list');
    this.yearInput = document.querySelector('.input-year');
    this.submitButton = document.querySelector('#btn-form2');
    this.responseOutput = document.querySelector('.form2-response');
    this.historyTable = document.querySelector('.holidays-table');
    this.#API_KEY = API_KEY;
  }

  async getCountries() {
    try {
      const countries = await fetch(
        `https://calendarific.com/api/v2/countries?api_key=${this.#API_KEY}
        &language=uk`
      );

      if (!countries.ok) {
        throw `Status code: ${countries.status}`;
      }

      return countries.json();
    } catch (error) {
      this.displayMessage(error);
      throw new Error(error);
    }
  }
  filterCountries(data, query) {
    const response = data?.response;
    const countries = response.countries;
    return countries.filter((country) => {
      return country.country_name.toLowerCase().includes(query.toLowerCase());
    });
  }

  addToCountriesList(countries) {
    if (countries.lenth !== 0) {
      this.countriesList.innerHTML = '';
      countries.forEach((country) => {
        this.countriesList.innerHTML += `<li>${country.country_name}</li>`;
      });
    }
  }

  async getHolidays(data) {
    const country = this.#searchSelectedCountry(data);

    if (country) {
      try {
        const iso = country?.['iso-3166'];

        const year = this.yearInput.value;
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?
          api_key=${this.#API_KEY}
          &country=${iso}
          &year=${year}
          &language=uk`
        );

        if (!response.ok) {
          throw `status code: ${countries.status}`;
        }

        const jsonResponse = await response.json();

        if (jsonResponse.response.length === 0) {
          throw 'Інформація не знайдена!';
        }

        this.#addTableRows(jsonResponse.response?.holidays);
        this.#overrideLocalStorage(jsonResponse.response?.holidays);
      } catch (error) {
        this.displayMessage(error);
        throw new Error(error);
      }
    } else {
      this.displayMessage('Країна не знайдена! Оберіть країну зі списку.');
    }
  }

  getFromLocalStorage = function () {
    const data = localStorage.getItem('holidaysTableData');
    const holidaysArr = data !== null ? JSON.parse(data) : [];
    this.#addTableRows(holidaysArr);
  };

  displayMessage(text) {
    this.responseOutput.classList.remove('hidden');
    this.responseOutput.innerHTML = text;
    setTimeout(() => {
      this.responseOutput.classList.add('hidden');
    }, 5000);
  }

  sortTableByDate(sort) {
    const data = localStorage.getItem('holidaysTableData');
    const holidaysArr = data !== null ? JSON.parse(data) : [];
    const copiedHolidays = holidaysArr.slice();

    console.log(holidaysArr);

    if (sort === 'desc') {
      const sortIcon = `<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>`;
      copiedHolidays.sort(
        (b, a) => Number(a.date.datetime.day) - Number(b.date.datetime.day)
      );
      copiedHolidays.sort(
        (b, a) => Number(a.date.datetime.month) - Number(b.date.datetime.month)
      );
      this.#addTableRows(copiedHolidays, sortIcon);
    } else if (sort === 'asc') {
      const sortIcon = `<i class="fa fa-sort-amount-asc" aria-hidden="true"></i>`;

      copiedHolidays.sort(
        (a, b) => Number(a.date.datetime.day) - Number(b.date.datetime.day)
      );
      copiedHolidays.sort(
        (a, b) => Number(a.date.datetime.month) - Number(b.date.datetime.month)
      );
      this.#addTableRows(copiedHolidays, sortIcon);
    }
  }

  #searchSelectedCountry(data) {
    try {
      if (!data) {
        throw 'Список країн відсутній!';
      }
      const selectedCountry = this.countrySearch.value;
      const countries = data.response.countries;
      return countries.find((country) => {
        return (
          country.country_name.toLowerCase() === selectedCountry.toLowerCase()
        );
      });
    } catch (error) {
      this.displayMessage(error);
      throw new Error(error);
    }
  }

  #addTableRows(
    holidays,
    sortIcon = '<i class="fa fa-sort" aria-hidden="true"></i>'
  ) {
    if (holidays.length !== 0) {
      this.historyTable.innerHTML = `<th>Дата ${sortIcon}</th> <th>Назва свята</th>`;
      holidays.forEach((holiday) => {
        const year = holiday?.date?.datetime?.year;
        const month = ('0' + holiday?.date?.datetime?.month).slice(-2);
        const day = ('0' + holiday?.date?.datetime?.day).slice(-2);

        this.historyTable.classList.remove('hidden');
        this.historyTable.innerHTML += `<tr>
              <td>${year}-${month}-${day}</td>
              <td>${holiday?.name}</td>
            </tr>`;
      });
    } else {
      this.historyTable.classList.add('hidden');
    }
  }

  #overrideLocalStorage(holidays) {
    localStorage.setItem('holidaysTableData', JSON.stringify(holidays));
  }
}

export { TabsBar, FirstTab, SecondTab };
