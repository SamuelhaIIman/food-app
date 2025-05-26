const budgetUI = {
    slider: document.getElementById("budget-slider"),
    output: document.getElementById("budget-money-amount"),
    budget: document.getElementById("budget-money-per-day"),
}
const calendarUI = {
    daysContainer: document.getElementById('calendar-days'),
    monthYear: document.getElementById('month-year'),
    prevBtn: document.getElementById('prev'),
    nextBtn: document.getElementById('next'),
}
let date = new Date();

budgetUI.slider.addEventListener("input", () => {
  let budgetDayCalculation = budgetUI.slider.value / 7;
  budgetUI.output.innerHTML = budgetUI.slider.value + "€";
  budgetUI.budget.innerHTML = budgetDayCalculation.toFixed(2);
});

function renderCalendar() {
  date.setDate(1);
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayIndex = date.getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  calendarUI.monthYear.innerText = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
  calendarUI.daysContainer.innerHTML = '';

  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('button');
    calendarUI.daysContainer.appendChild(emptyCell);
    emptyCell.classList.add('calendar-day-empty');
  }

  for (let i = 1; i <= lastDay; i++) {
    const dayCell = document.createElement('button');
    dayCell.textContent = i;
    dayCell.classList.add('calendar-day');
    if (
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      dayCell.classList.add('today');
    }

    calendarUI.daysContainer.appendChild(dayCell);
  }
}

calendarUI.prevBtn.addEventListener('click', () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

calendarUI.nextBtn.addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

fetch("https://www.s-kaupat.fi/tuote/kotimaista-sika-nauta-jauheliha-23-400-g/6414893500075").then(res => {
  return res.json();
}).then(data => {
  console.log(data);
}).catch(error => console.log(error));

// function myFunction() {
//   // Get the text field
//   var copyText = document.getElementById("myInput");

//   // Select the text field
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); 

//   // Copy the text inside the text field
//   navigator.clipboard.writeText(copyText.value);
  
//   // Alert the copied text
//   alert("Copied the text: " + copyText.value);
// }

renderCalendar();
