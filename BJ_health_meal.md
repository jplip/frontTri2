---
layout: base
title: Eating Healthy
permalink: "/food/"
search_exclude: false
---
![Alt text](images/Food Tracker Icon.png)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Meal Health Analyzer</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }
    label {
        display: inline-block;
        width: 100px;
    }
    input, select {
        width: 150px;
    }
    button {
        padding: 10px 20px;
        margin-top: 10px;
        cursor: pointer;
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
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
</style>
</head>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<body>
<h1>Meal Health Analyzer</h1>

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

<script>
    const IDEAL_RATIOS = {
        'Dairy': 0.15,
        'Grain': 0.30,
        'Vegetables': 0.25,
        'Fruits': 0.20,
        'Protein': 0.10
    };

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

        // Plot user's pie chart
        const userRatios = Object.values(ratios);
        const userLabels = Object.keys(ratios);
        plotChart('userChart', userRatios, userLabels, 'Your Ratios');

        // Plot USDA's ideal pie chart
        const idealRatios = Object.values(IDEAL_RATIOS);
        const idealLabels = Object.keys(IDEAL_RATIOS);
        plotChart('idealChart', idealRatios, idealLabels, 'USDA Ideal Ratios');

        // Calculate healthy score and suggestions
        const { score, suggestion } = calculateHealthScore(ratios);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Healthy Score: ${score}</p><p>Suggestions:<br>${suggestion}</p>`;
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
        score = (10 - score * 100).toFixed(2);
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

<canvas id="userChart" width="300" height="300"></canvas>
<canvas id="idealChart" width="300" height="300"></canvas>

</body>
</html>


<!-- <html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cups Converter</title>
</head>
<body>
 <div id="selectedAscii"></div>
    <script src="https://jplip.github.io/frontTri2/assets/js/exercise.js" defer></script>
<div class="purple-form">
    <h2>Cups Converter</h2>
    <div>
        <label for="weightInput">Enter Weight:</label>
        <input type="number" id="weightInput" onchange="convertToCups()">
        <select id="weightUnit" onchange="convertToCups()">
            <option value="grams">Grams</option>
            <option value="pounds">Pounds</option>
        </select>
    </div>
    <div>
        <label for="cupsOutput">Cups:</label>
        <span id="cupsOutput"></span>
    </div>
</div>
<div class="purple-form">
    <script>
    function convertToCups() {
        const weightInput = parseFloat(document.getElementById('weightInput').value) || 0;
        const weightUnit = document.getElementById('weightUnit').value;
        let cupsOutput;
        if (weightUnit === 'grams') {
            // Standard density assumed for grams to cups conversion (approximate)
            const densityGramsToCups = 0.00422675; // 1 gram ≈ 0.00422675 cups
            cupsOutput = weightInput * densityGramsToCups;
        } else if (weightUnit === 'pounds') {
            // Standard density assumed for pounds to cups conversion (approximate)
            const densityPoundsToCups = 2.08635; // 1 pound ≈ 2.08635 cups
            cupsOutput = weightInput * densityPoundsToCups;
        }
        document.getElementById('cupsOutput').textContent = cupsOutput.toFixed(2);
    }
</script>
</div>
</body>
</html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Food Group Pie Chart</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
    canvas {
        display: block;
        margin: auto;
    }
</style>
</head>
<body>

<h2>Enter the quantities of food for each group:</h2>
<div>
    <label for="grains">Grains:</label>
    <input type="number" id="grains" name="grains" step="any">
</div>
<div>
    <label for="vegetables">Vegetables:</label>
    <input type="number" id="vegetables" name="vegetables" step="any">
</div>
<div>
    <label for="fruits">Fruits:</label>
    <input type="number" id="fruits" name="fruits" step="any">
</div>
<div>
    <label for="dairy">Dairy:</label>
    <input type="number" id="dairy" name="dairy" step="any">
</div>
<div>
    <label for="protein">Protein:</label>
    <input type="number" id="protein" name="protein" step="any">
</div>
<button onclick="generateCharts()">Generate Charts</button>
<p id="coinMessage"></p>

<div>
    <h2>Your Food Groups Distribution</h2>
    <canvas id="userPieChart" width="400" height="400"></canvas>
</div>

<div>
    <h2>USDA Recommended Food Group Ratios</h2>
    <canvas id="usdaPieChart" width="400" height="400"></canvas>
</div>

<script>

function generateCharts() {
    const userFoodGroups = ['Grains', 'Vegetables', 'Fruits', 'Dairy', 'Protein'];
    const userQuantities = [];
    const usdaRatios = [0.3, 0.4, 0.2, 0.1, 0.1];
    const similarityThreshold = 0.4; // Adjust the threshold as needed
    let similar = true;

    userFoodGroups.forEach(group => {
        const quantity = parseFloat(document.getElementById(group.toLowerCase()).value) || 0;
        userQuantities.push(quantity);
    });

    const userTotal = userQuantities.reduce((acc, val) => acc + val, 0);

    userFoodGroups.forEach((group, index) => {
        const userRatio = userQuantities[index] / userTotal;
        const usdaRatio = usdaRatios[index];
        if (Math.abs(userRatio - usdaRatio) > similarityThreshold) {
            similar = false;
            return;
        }
    });

    const userPieChartCanvas = document.getElementById('userPieChart');
    const userPieChartCtx = userPieChartCanvas.getContext('2d');
    const userPieChart = new Chart(userPieChartCtx, {
        type: 'pie',
        data: {
            labels: userFoodGroups,
            datasets: [{
                data: userQuantities,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Your Food Groups Distribution'
            }
        }
    });

    const usdaFoodGroups = ['Grains', 'Vegetables', 'Fruits', 'Dairy', 'Protein'];
    const usdaPieChartCanvas = document.getElementById('usdaPieChart');
    const usdaPieChartCtx = usdaPieChartCanvas.getContext('2d');
    const usdaPieChart = new Chart(usdaPieChartCtx, {
        type: 'pie',
        data: {
            labels: usdaFoodGroups,
            datasets: [{
                data: usdaRatios,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'USDA Recommended Food Group Ratios'
            }
        }
    });

    const coinMessage = document.getElementById('coinMessage');
    if (similar) {
        coinMessage.textContent = 'Congratulations! You earned a coin!';
    } else {
        coinMessage.textContent = '';
    }
}
</script>

</body>
</html> -->

