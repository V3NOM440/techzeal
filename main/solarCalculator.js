// Listen for changes in the dropdown to dynamically update the inputs
document.getElementById("calculationType").addEventListener("change", updateInputs);

// Function to generate input fields based on selected calculation type
function updateInputs() {
  const type = document.getElementById("calculationType").value;
  const inputsDiv = document.getElementById("inputs");
  inputsDiv.innerHTML = ""; // Clear existing inputs

  if (type === "power") {
    inputsDiv.innerHTML = `
      <label for="efficiency">Solar Panel Efficiency (in %):</label>
      <input type="number" id="efficiency" required>
      
      <label for="area">Solar Panel Area (in sq. meters):</label>
      <input type="number" id="area" required>
      
      <label for="radiation">Solar Radiation (in W/sq. meter):</label>
      <input type="number" id="radiation" required>
    `;
  } else if (type === "area") {
    inputsDiv.innerHTML = `
      <label for="power">Solar Panel Power (in W):</label>
      <input type="number" id="power" required>
      
      <label for="efficiency">Solar Panel Efficiency (in %):</label>
      <input type="number" id="efficiencyArea" required>
      
      <label for="radiationArea">Solar Radiation (in W/sq. meter):</label>
      <input type="number" id="radiationArea" required>
    `;
  } else if (type === "cost") {
    inputsDiv.innerHTML = `
      <label for="powerCost">Solar Panel Power (in W):</label>
      <input type="number" id="powerCost" required>
      
      <label for="costPerWatt">Cost per Watt (in ₹/W):</label>
      <input type="number" id="costPerWatt" required>
    `;
  }
}

// Listen for the calculate button click event
document.getElementById("calculateBtn").addEventListener("click", calculate);

// Function to calculate based on input values
function calculate() {
  const type = document.getElementById("calculationType").value;
  let result;

  if (type === "power") {
    const efficiency = parseFloat(document.getElementById("efficiency").value);
    const area = parseFloat(document.getElementById("area").value);
    const radiation = parseFloat(document.getElementById("radiation").value);

    if (isNaN(efficiency) || isNaN(area) || isNaN(radiation)) {
      result = "Please fill in all the fields with valid numbers.";
    } else {
      result = (efficiency / 100) * area * radiation;
      result = `The solar panel's power is: ${result} W`;
    }

  } else if (type === "area") {
    const power = parseFloat(document.getElementById("power").value);
    const efficiency = parseFloat(document.getElementById("efficiencyArea").value);
    const radiation = parseFloat(document.getElementById("radiationArea").value);

    if (isNaN(power) || isNaN(efficiency) || isNaN(radiation)) {
      result = "Please fill in all the fields with valid numbers.";
    } else {
      result = (power * 100) / (efficiency * radiation);
      result = `The solar panel's area is: ${result} sq. meters`;
    }

  } else if (type === "cost") {
    const power = parseFloat(document.getElementById("powerCost").value);
    const costPerWatt = parseFloat(document.getElementById("costPerWatt").value);

    if (isNaN(power) || isNaN(costPerWatt)) {
      result = "Please fill in all the fields with valid numbers.";
    } else {
      result = power * costPerWatt;
      result = `The solar panel's cost is: $${result}`;
    }
  }

  // Display the result
  document.getElementById("result").textContent = result;
}

// Initialize the inputs when the page loads
updateInputs();


function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Close modal on clicking anywhere outside
window.onclick = function(event) {
  const modals = document.getElementsByClassName('modal');
  for (let i = 0; i < modals.length; i++) {
      if (event.target === modals[i]) {
          modals[i].style.display = 'none';
      }
  }
};
