---
layout: base
title: Home
permalink: "/"
search_exclude: false
---
<html lang="en">
  <style>
    /* CSS for styling purposes (optional) */
    .feature {
      margin-bottom: 10px;
    }
  </style>
  <h1>XOR GATE CHECKBOX</h1>
  
  <!-- Feature: Completed Exercise -->
   <label for="checkboxA">Checkbox A</label>
  <input type="checkbox" id="checkboxA">
  <br>
  <label for="checkboxB">Checkbox B</label>
  <input type="checkbox" id="checkboxB">
  <div class="result" id="xorResult">XOR Gate Result: </div>

  <script>

    const checkboxA = document.getElementById('checkboxA');
    const checkboxB = document.getElementById('checkboxB');



    // Event listeners for checkboxes
    checkboxA.addEventListener('change', () => {
      performXORLogic();
    });

    checkboxB.addEventListener('change', () => {
      performXORLogic();
    });

    function performXORLogic() {
      const isCheckedA = checkboxA.checked;
      const isCheckedB = checkboxB.checked;
      const xorResult = (isCheckedA || isCheckedB) && !(isCheckedA && isCheckedB);
      resultDiv.textContent = `XOR Gate Result: ${xorResult}`;
      }
 </script>
  <a href="https://jplip.github.io/frontTri2/login/"><button class="btn">Login</button></a>
    <a href="https://jplip.github.io/frontTri2/Register/"><button class="btn">Register</button></a>
    <div class="top-container">
        <div class="element">
            <a href="https://jplip.github.io/frontTri2/exercise/">
        <img src="images/ExerciseHome.png">
            </a>
        </div>
        <div class="element">
            <a href="https://jplip.github.io/frontTri2/sleep/">
        <img src="images/SleepHome.png">
            </a>
        </div>
    </div>
    <div class="bottom-container">
        <div class="element">
            <a href="https://jplip.github.io/frontTri2/stress/">
        <img src="images/LessBlurryStress.png">
            </a>
        </div>
        <div class="element">
            <a href="https://jplip.github.io/frontTri2/food/">
        <img src="images/FoodHome.png">
            </a>
        </div>
        <div class="element">
            <a href="https://jplip.github.io/frontTri2/water/">
        <img src="images/WaterHome.png">
            </a>
        </div>
    </div>
</html>