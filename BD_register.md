---
layout: base
title: Register
permalink: /Register/
--- 

<div class="purple-form">
    <form id="registerForm">
        <p><label>
            Name:
            <input type="text" name="name" id="name" required>
        </label></p>
        <p><label>
            Username:
            <input type="text" name="uid" id="uid" required>
        </label></p>
        <p><label>
            Password:
            <input type="password" name="password" id="password" required>
        </label></p>
        <p><label>
            Confirm Password:
            <input type="password" name="confirmPassword" id="confirmPassword" required>
        </label></p>
        <input type="submit" value="Create User">
    </form>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            create_user();
        });
    });
    function create_user(){
        const name = document.getElementById('name').value;// DEFINE VALUES
        const uid =  document.getElementById('uid').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const formData = {
            "name": name,
            "uid": uid,
            "password": password,
            // Add other form fields as needed
        };            
        fetch('http://127.0.0.1:8240/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                window.location.href = '/frontTri2/login/'; // Redirect upon successful user creation
            } else {
                console.error('User creation failed');
                alert("User Creation failed. Try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
</script>