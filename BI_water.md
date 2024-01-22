---
layout: base
title: Water 
permalink: /water/
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        #progress-bar-container {
            width: 300px;
            height: 30px;
            border: 1px solid #ccc;
            margin: 20px;
            position: relative;
            overflow: hidden;
        }
        #progress-bar {
            height: 100%;
            background-color: #0a4dab;
            transition: width 0.9s ease-in-out;
        }
        #progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            font-weight: bold;
        }
        #cup-info {
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="purple-form">
        <label for="cupInput">Enter number of cups: </label>
        <input type="number" id="cupInput" min="0">
        <input type="submit" onclick="updateProgressBar()" value="Submit">
    </div>
    <div id="progress-bar-container">
        <div id="progress-bar"></div>
        <div id="progress-text">0 cups</div>
    </div>
    <div id="cup-info"></div>
    <script src="https://cdn.jsdelivr.net/canvas-confetti/0.5.3/canvas-confetti.min.js"></script>
    <script>
        let totalCups = 0;
        function updateProgressBar() {
            const inputElement = document.getElementById('cupInput');
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            const cupInfo = document.getElementById('cup-info');
            const maxCups = 10;
            const cups = parseInt(inputElement.value);
            if (!isNaN(cups) && cups >= 0 && cups <= maxCups) {
                totalCups += cups;
                const percentage = (totalCups / maxCups) * 100;
                progressBar.style.width = percentage + '%';
                progressText.innerText = totalCups + ' cups';
                if (totalCups >= 8) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    progressBar.style.width = '100%';
                }
                cupInfo.innerText = 'You have drank ' + totalCups + ' cups.';
                if (totalCups <= 3) {
                    cupInfo.innerText += ' Keep going!';
                } else if (totalCups <= 7) {
                    cupInfo.innerText += ' Good job! Stay hydrated!';
                } else {
                    cupInfo.innerText += ' Amazing! You are well-hydrated!';
                }
                inputElement.value = '';
            }
        }
    </script>

</body>
</html>
