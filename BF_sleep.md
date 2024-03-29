---
layout: base
title: Sleep 
permalink: /sleep/
--- 
![Alt text](images/Sleep Tracker Logo.png)
<meta charset="UTF-8">
<title>Sleep Tracker</title>
<style>
    /* Basic styling for demonstration purposes */
    /* Your CSS styles here */
</style>
<div id="selectedAscii"></div>
<script src="https://jplip.github.io/frontTri2/assets/js/exercise.js" defer></script>
<div class="purple-form">
    <form id="sleepForm">
        <label for="sleepHours">Hours of Sleep:</label>
        <input type="number" id="sleepHours" name="sleepHours" placeholder="Enter hours of sleep" required>
        <label for="quality">Quality of Sleep:</label>
        <select id="quality" name="quality" required>
            <option value="" disabled selected>Select quality</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
        </select>
        <label for="sleepDate">Date:</label>
        <input type="date" id="sleepDate" name="sleepDate" required>
        <input type="submit" value="Submit">
    </form>
</div>

<script>
    const userIDFromLocalStorage = localStorage.getItem('loggedInUserId');
    const userNameFromLocalStorage = localStorage.getItem('loggedInUserName');
    console.log(userIDFromLocalStorage);
    document.getElementById('sleepForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const sleepHours = document.getElementById('sleepHours').value;
        const quality = document.getElementById('quality').value;
        const sleepDate = document.getElementById('sleepDate').value;
        fetch(`https://fitness-back.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const originalSleepData = Array.isArray(data.tracking) ? data.tracking : [];
                    console.log(originalSleepData)
                    const originalExerciseData = Array.isArray(data.exercise) ? data.exercise : [];
                    const sleep = {
                        "sleepHours": sleepHours,
                        "quality": quality, 
                        "sleepDate": sleepDate
                    }
                    const updatedSleepData = [...originalSleepData, sleep];
                    console.log(updatedSleepData);
                    const data2 = {
                        "id": userIDFromLocalStorage,
                        "name": userNameFromLocalStorage, 
                        "uid": "life",
                        "dob": "10/12/13",
                        "age": "16",
                        "exercise": originalExerciseData,
                        "tracking": updatedSleepData
                    };
                    var jsonData = JSON.stringify(data2);
                    fetch(`https://fitness-back.stu.nighthawkcodingsociety.com/api/users/${userIDFromLocalStorage}`, {
                        method: 'PUT',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: jsonData
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Server response:', data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
     </script>
 <iframe src="https://jplip.github.io/frontTri2/sleepgraph/" width="800" height="600" frameborder="0"></iframe>
    
<html>
