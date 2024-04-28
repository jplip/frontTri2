---
layout: base
title: Eating Healthy
permalink: "/food/"
search_exclude: false
---
![Alt text](images/Food Tracker Icon.png)
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Meal Health Analyzer</title>
<style>
    .hidden {
       display: none;
    }
    input, select {
        width: 190px;
    }
    button {
      padding: 10px 20px;
      margin-left: 10px;
      border: none;
      border-radius: 5px;
      color: white;
      background-color: rgb(181, 82, 82);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: darkred;
    }
    #pieCharts {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
    #chartContainer {
        width: 45%;
    }
    #result {
        margin-top: 20px;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
</style>
</head>
<body>
<h1>Meal Health Analyzer</h1>
<form class="purple-form">
  <form id="foodForm">
      <div>
          <label for="dairy">Dairy:</label>
          <input type="number" id="dairy" min="0" step="0.01">
          <select id="dairyUnit">
              <option value="grams">grams</option>
              <option value="cups" selected>cups</option>
              <option value="pounds">pounds</option>
          </select>
      </div>
      <div>
          <label for="grain">Grain:</label>
          <input type="number" id="grain" min="0" step="0.01">
          <select id="grainUnit">
              <option value="grams">grams</option>
              <option value="cups" selected>cups</option>
              <option value="pounds">pounds</option>
          </select>
      </div>
      <div>
          <label for="vegetables">Vegetables:</label>
          <input type="number" id="vegetables" min="0" step="0.01">
          <select id="vegetablesUnit">
              <option value="grams">grams</option>
              <option value="cups" selected>cups</option>
              <option value="pounds">pounds</option>
          </select>
      </div>
      <div>
          <label for="fruits">Fruits:</label>
          <input type="number" id="fruits" min="0" step="0.01">
          <select id="fruitsUnit">
              <option value="grams">grams</option>
              <option value="cups" selected>cups</option>
              <option value="pounds">pounds</option>
          </select>
      </div>
      <div>
          <label for="protein">Protein:</label>
          <input type="number" id="protein" min="0" step="0.01">
          <select id="proteinUnit">
              <option value="grams">grams</option>
              <option value="cups" selected>cups</option>
              <option value="pounds">pounds</option>
          </select>
      </div>
      <button type="button" onclick="plotPieCharts()">Plot Pie Charts</button>
  </form>
  
  <div id="result"></div>
  
  <div style="display: flex;">
      <div style="margin-right: 20px;"> <!-- Adjust margin as needed -->
          <p>Your Healthy Meal</p>
          <canvas id="userChart" width="250" height="250"></canvas>
      </div>
      <div>
          <p>USDA Healthy Meal</p>
          <canvas id="idealChart" width="250" height="250"></canvas>
      </div>
  </div>
  
  
  <div id="history">
      <button type="button" onclick="toggleHistory()">Toggle History</button>
      <table id="historyTable">
          <thead>
              <tr>
                  <th>Date</th>
                  <th>Healthy Score</th>
              </tr>
          </thead>
          <tbody>
              <!-- History data will be populated here -->
          </tbody>
      </table>
  </div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const IDEAL_RATIOS = {
        'Dairy': 0.15,
        'Grain': 0.30,
        'Vegetables': 0.25,
        'Fruits': 0.20,
        'Protein': 0.10
    };
    // Function to add an entry to the history table and local storage
    function addToHistory(date, score) {
        // Create a history object
        const historyData = {
            date: date,
            score: score
        };
        // Retrieve existing history data from local storage
        let existingHistory = localStorage.getItem('mealHealthHistory');
        // If no existing history data, create an empty array
        if (!existingHistory) {
            existingHistory = [];
        } else {
            // Parse existing history data from JSON
            existingHistory = JSON.parse(existingHistory);
        }
        // Add the new history object to the existing history array
        existingHistory.push(historyData);
        // Store the updated history data back into local storage
        localStorage.setItem('mealHealthHistory', JSON.stringify(existingHistory));
        // Update the history table in the HTML
        updateHistoryTable(existingHistory);
    }
    // Function to update the history table in the HTML
    function updateHistoryTable(historyData) {
        const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];        
        // Clear existing table rows
        historyTable.innerHTML = '';
        // Loop through history data and populate the table
        historyData.forEach(entry => {
            const newRow = historyTable.insertRow();
            const dateCell = newRow.insertCell(0);
            const scoreCell = newRow.insertCell(1);
            dateCell.innerHTML = entry.date;
            scoreCell.innerHTML = entry.score;
        });
    }
    // Function to load history data from local storage when the page loads
    function loadHistoryFromLocalStorage() {
        const existingHistory = localStorage.getItem('mealHealthHistory');
        if (existingHistory) {
            updateHistoryTable(JSON.parse(existingHistory));
        }
    }
    // Call the function to load history data from local storage when the page loads
    loadHistoryFromLocalStorage();
    function plotPieCharts() {
        const values = {};
        const units = {
            'Dairy': document.getElementById('dairyUnit').value,
            'Grain': document.getElementById('grainUnit').value,
            'Vegetables': document.getElementById('vegetablesUnit').value,
            'Fruits': document.getElementById('fruitsUnit').value,
            'Protein': document.getElementById('proteinUnit').value
        };
        for (let group in IDEAL_RATIOS) {
            const value = parseFloat(document.getElementById(group.toLowerCase()).value);
            values[group] = convertToCups(value, units[group]);
        }
        const totalCups = Object.values(values).reduce((acc, val) => acc + val, 0);
        const ratios = {};
        for (let group in values) {
            ratios[group] = values[group] / totalCups;
        }
        const userRatios = Object.values(ratios);
        const userLabels = Object.keys(ratios);
        plotChart('userChart', userRatios, userLabels, 'Your Ratios');
        const idealRatios = Object.values(IDEAL_RATIOS);
        const idealLabels = Object.keys(IDEAL_RATIOS);
        plotChart('idealChart', idealRatios, idealLabels, 'USDA Ideal Ratios');
        const { score, suggestion } = calculateHealthScore(ratios);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Healthy Score: ${score}</p><p>Suggestions:<br>${suggestion}</p>`;        
        addToHistory(new Date().toLocaleDateString(), score);
    }
    function convertToCups(value, unit) {
        if (unit === 'grams') {
            return value * 0.00422675;
        } else if (unit === 'pounds') {
            return value * 1.917;
        } else {
            return value;
        }
    }
    function calculateHealthScore(ratios) {
        let score = 0;
        let suggestion = '';
        for (let group in ratios) {
            const ratio = ratios[group];
            const idealRatio = IDEAL_RATIOS[group];
            score += Math.abs(ratio - idealRatio);
            if (ratio < idealRatio) {
                suggestion += `Add more ${group}<br>`;
            } else if (ratio > idealRatio) {
                suggestion += `Reduce ${group}<br>`;
            }
        }
        score = score/3.5
        score = ((1 - score) * 100).toFixed(2); 
        return { score, suggestion };
    }
    function plotChart(containerId, data, labels, title) {
        const ctx = document.getElementById(containerId).getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data,
                    backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0']
                }],
                labels
            },
            options: {
                title: {
                    display: true,
                    text: title
                }
            }
        });
    }
    function toggleHistory() {
        const historyTable = document.getElementById('historyTable');
        historyTable.classList.toggle('hidden');
    }
</script>

<div class="purple-form">
    <h1>Suggested grams of Fruits and Vegetables</h1>
    <form id="prod-form">
        <label for="steps">Steps (in hundreds):</label>
        <input type="number" id="steps" placeholder="Enter number of steps" required>
        <label for="stress">Stress Level:</label>
        <input type="number" id="stress" placeholder="Enter stress level (1-10)" required>
        <label for="meditation">Meditation Level:</label>
        <input type="number" id="meditation" placeholder="Enter meditation level (1-10)" required>
        <button type="button" id="calculate-prod" onclick="calculateProduce()">Calculate Produce</button>
    </form>
    <div id="message"></div>
    <div id="fitness-message"></div>
</div>

<script>
    function calculateProduce() {
        var steps = document.getElementById('steps').value;
        var stress = document.getElementById('stress').value;
        var meditation = document.getElementById('meditation').value;

        // Prepare the data to send to the backend API
        var data = {
            "Steps": parseInt(steps),
            "Stress": parseInt(stress),
            "Meditation": parseInt(meditation)
        };

        // Make a POST request to the backend API endpoint
        // fetch('/predict_produce', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        fetch('http://localhost:5000/api/fitness/predict', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to calculate produce');
            }
            return response.text(); // Read response as text
        })
        .then(data => {
            // var produce = JSON.parse(data); // Parse text data into JSON object

            // // Display the predicted produce from the backend response
            // // Display the predicted produce from the backend response
            // document.getElementById('message').innerText = "Predicted Produce: " + JSON.stringify(produce);
                var responseData = JSON.parse(data); // Parse text data into JSON object

    // Extract the value associated with the 'predicted_produce' key
                var predictedProduce = responseData.predicted_produce;

    // Display the predicted produce value
                document.getElementById('message').innerText = "Suggested Grams Per Meal: " + predictedProduce;


            // // Display a random motivational message
            // var messages = [
            //     "Keep up the great work!",
            //     "You're doing amazing!",
            //     "You're one step closer to your fitness goals!",
            //     "Every step counts towards a healthier you!",
            //     "Stay motivated and keep moving forward!",
            //     "Your efforts will pay off in the long run!"
            // ];
            // var randomMessage = messages[Math.floor(Math.random() * messages.length)];
            // document.getElementById('fitness-message').innerText = randomMessage;
        })
        .catch(error => {
            console.error('Error:', error.message);
            // Display an error message if something goes wrong
            document.getElementById('message').innerText = "Error: " + error.message;
        });
    }
</script>
