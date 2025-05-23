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
    budgetUI.output.value = budgetUI.slider.value;
    if(budgetUI.output.value > 500 ) {
        budgetUI.output.value = 500;
    }
    
    let budgetDayCalculation = budgetUI.output.value / 30;
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

  renderCalendar();
