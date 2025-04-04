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



/* 
document.addEventListener("DOMContentLoaded", function () {
    const loginPage = document.getElementById("login-page");
    const dashboardPage = document.getElementById("dashboard-page");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
   // const userGreeting = document.getElementById("user-greeting");
    
    function login() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username === "admin" && password === "password") {
            loginPage.style.display = "none";
            dashboardPage.style.display = "flex";
            userGreeting.textContent = `Welcome, ${username}`;
        } else {
            errorMessage.style.display = "block";
        }
    }
    
    function logout() {
        loginPage.style.display = "flex";
        dashboardPage.style.display = "none";
        usernameInput.value = "";
        passwordInput.value = "";
        errorMessage.style.display = "none";
    }
    
    /* function showSection(sectionId) {
        document.querySelectorAll(".section").forEach(section => {
            section.classList.remove("active");
        });
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add("active");
        }
    } 

     function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll(".section").forEach(section => {
            section.classList.remove("active");
        });
    
        // Show the selected section
        document.getElementById(sectionId).classList.add("active");
    }

    function showSubSection(subSectionId) {
        document.querySelectorAll(".sub-section").forEach(sub => {
            sub.style.display = "none";
        });
        const subSection = document.getElementById(subSectionId);
        if (subSection) {
            subSection.style.display = "block";
        }
    }

   
    
    
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Form submitted successfully!");
        });
    });
    
    window.login = login;
    window.logout = logout;
    window.showSection = showSection;
    window.showSubSection = showSubSection;
});
*/