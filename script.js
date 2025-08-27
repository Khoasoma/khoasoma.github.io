let counter = 0;

//Static
const birthdayString = "Focus: Performance & Infrastructure";
const celebrateString = "Building scalable gaming infrastructure!";

//Countdown  
const birthdayMonth = 12;
const birthdayDay = 31;
const birthYear = 2008; // Change to your birth year
const today = new Date();
const currentYear = today.getFullYear();

let nextBirthday = new Date(currentYear, birthdayMonth - 1, birthdayDay);
if (today > nextBirthday) {
    nextBirthday = new Date(currentYear + 1, birthdayMonth - 1, birthdayDay);
}

const timeDifference = nextBirthday - today;
const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

const nextAge = nextBirthday.getFullYear() - birthYear;

//Event
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('countdown').textContent = `${daysUntilBirthday} days until new year!`;

    // Disable right-click and dev tools
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.shiftKey && event.key === 'C') || (event.ctrlKey && event.key === 'U')) {
            event.preventDefault();
        }
    });
    
    //Status
    fetch('https://api.lanyard.rest/v1/users/808974657994752050')
        .then(response => response.json())
        .then(data => {
            const status = data.data.discord_status;
            const statusElement = document.getElementById('bio-status');
            
            // Set the text based on status
            statusElement.textContent = '●';
            
            // Remove any existing status classes
            statusElement.classList.remove('online', 'idle', 'dnd', 'offline');

            console.log(status);
            
            // Add class based on the status
            switch (status) {
                case 'online':
                    statusElement.classList.add('online');
                    break;
                case 'idle':
                    statusElement.classList.add('idle');
                    break;
                case 'dnd':
                    statusElement.classList.add('dnd');
                    break;
                case 'offline':
                    statusElement.classList.add('offline');
                    break;
                default:
                    statusElement.classList.add('offline'); // Default to offline
            }
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById('bio-status').textContent = '⚠︎';
        });

    setInterval(change, 5000);
});

function change() {
    document.getElementById("countdown").setAttribute("class", "text-fade");

    setTimeout(() => {
        const countdownElement = document.getElementById('countdown');
        if (counter == 0) {
            countdownElement.textContent = birthdayString;
        }
        if (counter == 1) {
            countdownElement.textContent = `${daysUntilBirthday} days until new year!`;
        }
        document.getElementById("countdown").setAttribute("class", "text-show");
    }, 500)

    counter++;

    if (counter > 1) {
        counter = 0;
    }
}

// Typed.js for name animation
var typed = new Typed('#name', {
    strings: ['minecraft optimizer', 'backend developer', 'performance engineer', 'infrastructure specialist', 'java enthusiast', 'server architect'],
    typeSpeed: 96,
    backSpeed: 96,
    cursorChar: "_",
    shuffle: true,
    smartBackspace: true,
    loop: true,
});

// Typed.js for anime
var animeTyped = new Typed('#anime', {
    strings: [
        "Frieren", 
        "Otonari no Tenshi-sama",
        "Roshidere", 
        "Miss Kobayashi's Dragon Maid",
        "Sword Art Online",
        "Jujutsu Kaisen",
        "Dark Gathering",
        "Senko-san",
        "Demon Slayer"
    ],
    typeSpeed: 96,
    loop: true,
    fadeOut: true,
});
