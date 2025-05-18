const slider = document.getElementById("slider");
const output = document.getElementById("demo");

slider.addEventListener("input", () => {
    output.value = slider.value;
});