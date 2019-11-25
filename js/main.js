// dates are counted the same way as arrays
// Janurary = 0
// December = 11

// Store Christmas Day
var endDate = new Date(2019, 11, 25, 0, 0);

var timer = setInterval(function() {
  var now = new Date().getTime();
  let t = endDate - now;

  if (t >= 0) {
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((t % (1000 * 60)) / 1000);
    var emojis = [
      "🎅",
      "🤶",
      "🧝‍♂️",
      "🧝‍♀️",
      "👪",
      "🦌",
      "🍪",
      "🥛",
      "🍷",
      "🍴",
      "⛪",
      "🌟",
      "❄",
      "☃",
      "⛄",
      "🔥",
      "🎄",
      "🎁",
      "🧦",
      "🔔",
      "🎶"
    ];

    // Ramdom Emoji per minute
    function emojiLoop(max) {
      return (i = Math.floor(Math.random() * Math.floor(max)));
    }
    emojiLoop(emojis.length);

    // Gif Animation Every Minute
    if (secs % 60 == 0) {
      var gif = document.createElement("div");
      gif.classList.add("giphy-embed");
      var wrapper = document.querySelector(".wrapper");
      wrapper.appendChild(gif);
      setTimeout(function() {
        gif.remove();
      }, 3500);
      document.querySelector(".emojis").innerHTML = emojis[i];
    }

    document.querySelector("#days").innerHTML = days;
    document.querySelector("#hours").innerHTML = hours;
    document.querySelector("#minutes").innerHTML = mins;
    document.querySelector("#seconds").innerHTML = secs;
  } else {
    var digits = document.querySelectorAll(".digit");
    for (digit of digits) {
      digit.style.display = "none";
    }
    document.querySelector(".endtext").style.display = "block";
  }
}, 1000);

// Adding Snow Effect

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var particlesOnScreen = 245;
var particlesArray = [];
var w, h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max) {
  return min + Math.random() * (max - min + 1);
}

function clientResize(ev) {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", clientResize);

function createSnowParticles() {
  var i;
  for (i = 0; i < particlesOnScreen; i++) {
    particlesArray.push({
      x: Math.random() * w,
      y: Math.random() * h,
      opacity: Math.random(),
      speedX: random(-11, 11),
      speedY: random(7, 15),
      radius: random(0.5, 4.8)
    });
  }
}

function drawSnowParticles() {
  var i;
  for (i = 0; i < particlesArray.length; i++) {
    var gradient = ctx.createRadialGradient(
      particlesArray[i].x,
      particlesArray[i].y,
      0,
      particlesArray[i].x,
      particlesArray[i].y,
      particlesArray[i].radius
    );

    gradient.addColorStop(
      0,
      "rgba(255,255,255," + particlesArray[i].opacity + ")"
    );
    gradient.addColorStop(
      0.8,
      "rgba(210,236,242," + particlesArray[i].opacity + ")"
    );
    gradient.addColorStop(
      1,
      "rgba(237,247,249," + particlesArray[i].opacity + ")"
    );

    ctx.beginPath();
    ctx.arc(
      particlesArray[i].x,
      particlesArray[i].y,
      particlesArray[i].radius,
      0,
      Math.PI * 2,
      false
    );

    ctx.fillStyle = gradient;
    ctx.fill();
  }
}

function moveSnowFlakes() {
  var i;
  for (i = 0; i < particlesArray.length; i++) {
    particlesArray[i].x += particlesArray[i].speedX;
    particlesArray[i].y += particlesArray[i].speedY;

    if (particlesArray[i].y > h) {
      particlesArray[i].x = Math.random() * w * 1.5;
      particlesArray[i].y = -50;
    }
  }
}

function updateSnowFall() {
  ctx.clearRect(0, 0, w, h);
  drawSnowParticles();
  moveSnowFlakes();
}

setInterval(updateSnowFall, 50);
createSnowParticles();
