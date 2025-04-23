document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        alert("Form submitted successfully!"); 
    });
});

const validUsers = {
    "ADMIN": "1234",
    "USER": "5678"
};

let assets = [];
let repairs = [];

function checkLoginStatus() {
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("dashboard-page").style.display = "flex";
    document.getElementById("user-greeting").innerText = `Welcome, ${loggedInUser}`;
    
    document.getElementById("profile-name").innerText = `Name: ${loggedInUser}`;
    
  
    showSection('dashboard');
}
}

window.onload = function() {
checkLoginStatus();

const savedAssets = localStorage.getItem("assetData");
const savedRepairs = localStorage.getItem("repairData");

if (savedAssets) {
    assets = JSON.parse(savedAssets);
    updateCounters();
}

if (savedRepairs) {
    repairs = JSON.parse(savedRepairs);
    updateCounters();
}

setupFormHandlers();
};
function login() {
    let username = document.getElementById("username").value.toUpperCase();
    let password = document.getElementById("password").value;

    if (validUsers[username] && validUsers[username] === password) {
      
        localStorage.setItem("loggedInUser", username);
        document.getElementById("login-page").style.display = "none";
        document.getElementById("dashboard-page").style.display = "flex";
        document.getElementById("user-greeting").innerText = `Welcome, ${username}`;
        
       
        document.getElementById("profile-name").innerText = `Name: ${username}`;
        
        
        showSection('dashboard'); 
    } else {
        document.getElementById("error-message").style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    checkLoginStatus();
    
    const savedAssets = localStorage.getItem("assetData");
    const savedRepairs = localStorage.getItem("repairData");
    
    if (savedAssets) {
        assets = JSON.parse(savedAssets);
        updateCounters();
    }
    
    if (savedRepairs) {
        repairs = JSON.parse(savedRepairs);
        updateCounters();
    }
    
   
    setupFormHandlers();
});

function setupFormHandlers() {
   
    document.getElementById("laptop-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const assetData = {
            type: "laptop",
            user: formData.get("input[placeholder='User']"),
            assetTag: formData.get("input[placeholder='Asset Tag']"),
            serialNumber: formData.get("input[placeholder='Serial Number']"),
            model: formData.get("input[placeholder='Asset Model']"),
            date: new Date().toISOString()
        };
        
        assets.push(assetData);
        localStorage.setItem("assetData", JSON.stringify(assets));
        updateCounters();
        this.reset();
        alert("Laptop asset added successfully!");
    });

  
    document.getElementById("other-assets-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const assetData = {
            type: "other",
            model: formData.get("input[placeholder='Asset Model']"),
            assetTag: formData.get("input[placeholder='Asset Tag']"),
            serialNumber: formData.get("input[placeholder='Serial Number']"),
            vendor: formData.get("input[placeholder='Vendor']"),
            branch: formData.get("input[placeholder='Branch']"),
            date: new Date().toISOString()
        };
        
        assets.push(assetData);
        localStorage.setItem("assetData", JSON.stringify(assets));
        updateCounters();
        this.reset();
        alert("Asset added successfully!");
    });
    
    
    document.getElementById("repairs-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const repairData = {
            serialNumber: formData.get("input[placeholder='Serial Number']"),
            assetTag: formData.get("input[placeholder='Asset Tag']"),
            fault: formData.get("input[placeholder='Fault']"),
            date: new Date().toISOString()
        };
        
        repairs.push(repairData);
        localStorage.setItem("repairData", JSON.stringify(repairs));
        updateCounters();
        this.reset();
        alert("Repair request added successfully!");
    });
}

function updateCounters() {
    document.getElementById("total-assets").innerText = assets.length;
    document.getElementById("total-repairs").innerText = repairs.length;
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    
    document.querySelectorAll('.sub-section').forEach(sub => {
        sub.style.display = 'none';
    });
}

function showSubSection(subSectionId) {
    document.querySelectorAll('.sub-section').forEach(sub => {
        sub.style.display = 'none';
    });
    document.getElementById(subSectionId).style.display = 'block';
}


function logout() {
    alert("logging out...");
    localStorage.removeItem("loggedInUser");
    document.getElementById("dashboard-page").style.display = "none";
    document.getElementById("login-page").style.display = "flex";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("error-message").style.display = "none";
}
