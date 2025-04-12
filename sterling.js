document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        alert("Form submitted successfully!"); 
    });
});

const validusers = {
    "ADMIN": "1234",
    "USER": "5678"
};

function login() {
    let username = document.getElementById("username").value.toUpperCase();
    let password = document.getElementById("password").value;

    if (validusers[username] && validusers[username] === password) {
        sessionStorage.setItem("loggedInUser", username);
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard-page").style.display = "flex";
        document.getElementById("user-greeting").innerText = `Welcome, ${username}`;

        
        showSection('dashboard'); 
    } else {
        document.getElementById("error-message").style.display = "block";
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function showSubSection(subSectionId) {
    document.querySelectorAll('.sub-section').forEach(sub => {
        sub.style.display = 'none';
    });
    document.getElementById(subSectionId).style.display = 'block';
}

function logout() {
    alert("Logging out...");
    document.getElementById("dashboard-page").style.display = "none";
    document.getElementById("login-page").style.display = "flex";
}