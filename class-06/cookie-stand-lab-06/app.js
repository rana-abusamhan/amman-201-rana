'use strict';


var HourOfWork = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];
var locations = [];
var columnTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var totalTotal = [];

var parent = document.getElementById('mai');
var table = document.createElement('table');
table.setAttribute('id', 'MainTable');
parent.appendChild(table);
var table = document.getElementById('MainTable');

function tablehead() {
    var firstrow = document.createElement('tr');
    table.appendChild(firstrow);
    var th = document.createElement('th');
    th.textContent = '';
    firstrow.appendChild(th);   



    for (let i = 0; i < HourOfWork.length; i++) {
        var th = document.createElement('th');
        th.textContent = HourOfWork[i];
        firstrow.appendChild(th);
    }

    var th2 = document.createElement('th');
    th.textContent = 'Daily Location Total';
    firstrow.appendChild(th2);

}
tablehead();



// constructor
function Location(Name, MinCustPHour, MaxCustPHour, avgCookPCust) {
    this.locname = Name;
    this.minCustPerHour = MinCustPHour;
    this.maxCustPerHour = MaxCustPHour;
    this.avgCookiePerCust = avgCookPCust;
    this.custPerHour = [];
    this.cookiesPerHour = [];
    this.totalCookies = 0;
    locations.push(this);

}

function customersPerHour(min, max) {
    var random = Math.random();
    random = (random * (max - min + 1)) + min;
    random = Math.floor(random);
    return random;
}

// customer per hour
Location.prototype.getCustomers = function () {
    for (let i = 0; i < HourOfWork.length; i++) {
        this.custPerHour.push(customersPerHour(this.minCustPerHour, this.maxCustPerHour));
    }
};

function cookiesPerHour(random, avg) {
    var value = 0;
    value = random * avg;
    value = Math.floor(value);
    return value;
}

// cookies per hour
Location.prototype.getCookies = function () {     // لكل ساعة رح نحسب عدد الكوكيز
    var answer;
    for (let i = 0; i < this.custPerHour.length; i++) {
        answer = cookiesPerHour(this.custPerHour[i], this.avgCookiePerCust);
        this.cookiesPerHour.push(answer);
        columnTotal[i] += answer;
    }
};
//// array cookiesPerHour بدنا نحسب مجموع عدد الكوكيز كامل بناءا على ال
function total(numberOfCookies) {
    var total = 0;
    for (let i = 0; i < numberOfCookies.length; i++) {
        total += numberOfCookies[i];
    }
    total = Math.floor(total);
    return (total);
}

// Total
Location.prototype.getTotal = function () {
    var totalValue = 0;
    totalValue = total(this.cookiesPerHour);
    this.totalCookies = totalValue;
    totalTotal.push(totalValue);

};

// table content
Location.prototype.renderMid = function () {
    console.log(this);
    var row1 = document.createElement('tr');
    table.appendChild(row1);
    var td = document.createElement('td');
    td.textContent = this.locname;
    row1.appendChild(td);

    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      let  td2 = document.createElement('td');
        td2.textContent = this.cookiesPerHour[i];
        row1.appendChild(td2);
    }

    td = document.createElement('td');
    td.textContent = this.totalCookies;
    row1.appendChild(td);
};

// last row 
function lastRow() {
    var tr = document.createElement('tr');
    table.appendChild(tr);
    var td = document.createElement('td');
    td.textContent = 'Totals';
    tr.appendChild(td);

    for (let i = 0; i < columnTotal.length - 1; i++) {
        td = document.createElement('td')
        td.textContent = columnTotal[i];
        tr.appendChild(td);
    }
    var totalSum = 0;
    td = document.createElement('td');
    for (let i = 0; i < totalTotal.length; i++) {
        totalSum += totalTotal[i];
    }
    td.textContent = totalSum;
    tr.appendChild(td);
}



var location1 = new Location('Seattle', 23, 65, 6.3);
var location2 = new Location('Tokyo', 3, 24, 1.2);
var location3 = new Location('Dubai', 11, 38, 3.7);
var location4 = new Location('Paris', 20, 38, 2.3);
var location5 = new Location('Lima', 2, 16, 4.6);

console.log(locations);
for (let i = 0; i < locations.length; i++) {
    locations[i].getCustomers();
    locations[i].getCookies();
    locations[i].getTotal();
    locations[i].renderMid();
}

lastRow();

/////////////
var form = document.getElementById('form1');
form.addEventListener('submit', ha);
function ha(event) {
    event.preventDefault();

    var rowCount = table.rows.length;
        table.deleteRow(rowCount-1);

    var locname = event.target.locname.value;
    var minCustPerHour = event.target.minCustPerHour.value;
    var maxCustPerHour = event.target.maxCustPerHour.value;
    var avgCookiePerCust = event.target.avgCookiePerCust.value;

    var addLocation = new Location(locname, minCustPerHour, maxCustPerHour, avgCookiePerCust);

    addLocation.getCustomers();
    addLocation.getCookies();
    addLocation.getTotal();
    addLocation.renderMid();

    lastRow();
}