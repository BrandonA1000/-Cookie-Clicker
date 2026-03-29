var pizzas = 0;
var pizzasPerClick = 1;
var pps = 0;

var chefs = 0;
var ovens = 0;
var restaurants = 0;
var managers = 0;

let achievements = [
    {
        name: "First Slice",
        goal: "Make 1 pizza",
        unlocked: false,
        check: () => pizzas >= 1
    },
    {
        name: "Minimum Wage",
        goal: "Make 100 pizzas",
        unlocked: false,
        check: () => pizzas >= 100
    },
    {
        name: "Beginner ",
        goal: "Make 1000 pizzas",
        unlocked: false,
        check: () => pizzas >= 1000
    },
    {
        name: "Boss",
        goal: "Hire 10 Chefs",
        unlocked: false,
        check: () => chefs >= 10
    },
    {
        name: "Oven Starter",
        goal: "Buy 5 Ovens",
        unlocked: false,
        check: () => ovens >= 5
    },
    {
        name: "Pizza Machine", 
        goal: "Reach 10 PPS", 
        unlocked: false, 
        check: () => pps >= 10
    },
    {
        name: "Restaurant Tycoon",
        goal: "Own 3 Restaurants",
        unlocked: false,
        check: () => restaurants >= 3
    },
    { 
        name: "Robotic Workers",
        goal: "Reach 50 PPS",
        unlocked: false,
        check: () => pps >= 50
    }
];


function checkAchievements() {
    achievements.forEach(a => {
        if (!a.unlocked && a.check()) {
            a.unlocked = true;
            showPopup("🏆 " + a.name);
        }
    });
}

function updateDisplay() {
  document.getElementById("scoreLabel").innerHTML =
    "Pizzas: " + pizzas.toFixed(1) + " (+" + pps.toFixed(1) + "/sec)";


    document.getElementById("chefLabel").innerText = "Owned: " + chefs;
    document.getElementById("ovenLabel").innerText = "Owned: " + ovens;
    document.getElementById("restaurantLabel").innerText = "Owned: " + restaurants;
    document.getElementById("managerLabel").innerText = "Owned: " + managers;

}



function pizzaClicked() {
    pizzas = Number((pizzas + pizzasPerClick).toFixed(1));
    updateDisplay();
    checkAchievements();
}

function buyupgrade1() {
    if (pizzas >= 10) {
        pizzas -= 10;
        pizzasPerClick = Number((pizzasPerClick + 0.1).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyupgrade2() {
    if (pizzas >= 100) {
        pizzas -= 100;
        pizzasPerClick = Number((pizzasPerClick + 1.2).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyupgrade3() {
    if (pizzas >= 250) {
        pizzas -= 250;
        pizzasPerClick = Number((pizzasPerClick + 3).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyChef() {
    if (pizzas >= 50) {
        pizzas -= 50;
        chefs++;
        pps = Number((pps + 0.1).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyOven() {
    if (pizzas >= 500) {
        pizzas -= 500;
        ovens++;
        pps = Number((pps + 1.5).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyRestaurant() {
    if (pizzas >= 2000) {
        pizzas -= 2000;
        restaurants++;
        pps = Number((pps + 5).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

function buyManager() {
    if (pizzas >= 5000) {
        pizzas -= 5000;
        managers++;
        pps = Number((pps + 17.5).toFixed(1));
        updateDisplay();
        checkAchievements();
    }
}

setInterval(() => {
    pizzas = Number((pizzas + pps).toFixed(1));
    updateDisplay();
    checkAchievements();
}, 1000);

function showAchievements() {
    let modal = document.getElementById("achievementModal");

    let content = `
        <div style='background: white; padding: 30px; border-radius: 10px; max-width: 400px; text-align: center;'>
            <h2>🏆 Achievements</h2>
            ${achievements.map(a => `
                <p>
                    <strong>${a.unlocked ? "✅" : "🔒"} ${a.name}</strong><br>
                    <small>${a.goal}</small>
                </p>
            `).join("")}
            <button onclick='closeAchievements()' style='padding: 10px 20px;'>Close</button>
        </div>
    `;

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "achievementModal";
        modal.style.cssText =
            "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 9998;";
        document.body.appendChild(modal);
    }

    modal.innerHTML = content;
    modal.style.display = "flex";
}

function closeAchievements() {
    document.getElementById("achievementModal").style.display = "none";
}
