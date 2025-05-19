
const slider = document.getElementById("budget-slider");
const output = document.getElementById("budget-money-amount");
const budget = document.getElementById("budget-money-per-day");

slider.addEventListener("input", () => {
    output.value = slider.value;
    if(output.value > 500 ) {
        output.value = 500;
    }
    
    let budgetDayCalculation = output.value / 30;
    budget.innerHTML = budgetDayCalculation.toFixed(2);
});
