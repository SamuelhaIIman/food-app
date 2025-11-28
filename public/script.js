const budgetUI = {
    slider: document.getElementById("budget_slider"),
    output: document.getElementById("budget_money_amount"),
    budget: document.getElementById("budget_money_per_day"),
}
const calendarUI = {
    daysContainer: document.getElementById('calendar_days'),
    monthYear: document.getElementById('month_year'),
    prevBtn: document.getElementById('prev'),
    nextBtn: document.getElementById('next'),
}
let date = new Date();

budgetUI.slider.addEventListener("input", () => {
  let budgetDayCalculation = budgetUI.slider.value / 7;
  budgetUI.output.innerHTML = budgetUI.slider.value + "€";
  budgetUI.budget.innerHTML = budgetDayCalculation.toFixed(2);
});

const budgetTest = {
  budgetTest: document.getElementById("budget_money"),
}
budgetTest.budgetTest.innerHTML = "14";

