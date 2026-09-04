/* =========================================
   STATE
========================================= */

let currentScreen = "screen-0";

let wrongCount1 = 0;
let wrongCount3 = 0;
let wrongCount4 = 0;

let moneyCount = 0;
let heartScore = 0;
let noCount = 0;


/* =========================================
   ELEMENTS
========================================= */

const screens = document.querySelectorAll(".screen");
const progressItems = document.querySelectorAll(".progress-item");
const stepCurrent = document.getElementById("stepCurrent");


/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    if (!cursorGlow) return;

    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";

});


/* =========================================
   SCREEN CHANGE
========================================= */

function goToScreen(screenId) {

    const target = document.getElementById(screenId);

    if (!target) return;

    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    target.classList.add("active");

    currentScreen = screenId;

    updateProgress();

}


/* =========================================
   START
========================================= */

function startGame() {

    goToScreen("screen-first-hello");

    createHeartRain(5);

}


/* =========================================
   START QUESTIONS
========================================= */

function startQuestions() {

    goToScreen("screen-1");

}


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

    const progressMap = {

        "screen-0": 0,

        "screen-first-hello": 1,

        "screen-1": 2,

        "screen-2": 3,

        "screen-3": 4,

        "screen-4": 5,

        "screen-5": 6,

        "screen-letter": 6,

        "screen-6": 6

    };

    const step = progressMap[currentScreen] ?? 1;


    if (stepCurrent) {

        stepCurrent.textContent =
            String(Math.max(step, 1)).padStart(2, "0");

    }


    progressItems.forEach((item, index) => {

        item.classList.remove("active", "done");


        if (step > index + 1) {

            item.classList.add("done");

        }


        if (step === index + 1) {

            item.classList.add("active");

        }

    });

}


/* =========================================
   WRONG ANSWER MESSAGES — QUESTION 1
========================================= */

const wrongMessages1 = [

    "نه بابا 😂 این‌قدر تابلو نباش دیگه...",

    "داری شانسی می‌زنی؟ 👀",

    "این گزینه خودش هم می‌دونه غلطه 😭",

    "داری عمداً منو اذیت می‌کنی؟ 😑",

    "من بودم دوباره فکر می‌کردم 😂",

    "مغزتو روشن کن عزیزم 🧠😂",

    "تلاش قشنگی بود... ولی نه 😌"

];


/* =========================================
   WRONG ANSWER MESSAGES — QUESTION 3
========================================= */

const wrongMessages3 = [

    "😂 نه، برای قرار اول خیلی رسمی شد.",

    "🎬 قشنگه... ولی جواب اون چیزی نیست که فکر می‌کنی.",

    "☕ نزدیک شدی، ولی هنوز نه.",

    "👀 یه کم ساده‌تر فکر کن.",

    "😂 قرار اول قرار نیست انقدر تشریفاتی باشه.",

    "🚶‍♂️ فکر کن... شاید یه گزینه خیلی ساده‌تر باشه."

];


/* =========================================
   WRONG ANSWER MESSAGES — QUESTION 4
========================================= */

const wrongMessages4 = [

    "🍕 خوشمزه‌ست... ولی قرار نبود پول خرج کنیم 😂",

    "🍔 نه بابا، داریم اقتصادی پیش میریم.",

    "🍦 حداقل یه چیزی انتخاب کن که رایگان باشه 😂",

    "😂 بودجه قرار اول همین اول کار تموم شد!",

    "🌬️ یه جواب خیلی عجیب‌تر منتظرته...",

    "💀 فکر کنم جواب درست از همه ارزون‌تره."

];


/* =========================================
   WRONG ANSWER
========================================= */

function wrongAnswer(button, scene) {

    if (!button) return;


    button.classList.remove("wrong");

    void button.offsetWidth;

    button.classList.add("wrong");


    const feedback =
        document.getElementById(`feedback-${scene}`);


    let messages;
    let count;


    if (scene === 1) {

        messages = wrongMessages1;
        count = wrongCount1;

    }

    else if (scene === 3) {

        messages = wrongMessages3;
        count = wrongCount3;

    }

    else if (scene === 4) {

        messages = wrongMessages4;
        count = wrongCount4;

    }

    else {

        return;

    }


    let message;


    if (count < messages.length) {

        message = messages[count];

    }

    else {

        message =
            messages[
                Math.floor(Math.random() * messages.length)
            ];

    }


    if (feedback) {

        feedback.textContent = message;

        feedback.classList.add("show");

    }


    /* =====================================
       QUESTION 1
    ===================================== */

    if (scene === 1) {

        wrongCount1++;


        if (wrongCount1 === 5 && feedback) {

            feedback.textContent =
                "😂 پنج بار زدی و هنوز پیداش نکردی؟!";

        }


        if (wrongCount1 === 10 && feedback) {

            feedback.textContent =
                "💀 فکر کنم داری عمداً بازی رو طولانی می‌کنی.";

        }


        if (wrongCount1 === 15 && feedback) {

            feedback.textContent =
                "😭 تو اومدی عاشقانه بازی کنی یا رکورد اشتباهات رو بزنی؟";

        }

    }


    /* =====================================
       QUESTION 3
    ===================================== */

    if (scene === 3) {

        wrongCount3++;


        if (wrongCount3 === 5 && feedback) {

            feedback.textContent =
                "😂 پنج بار انتخاب کردی و هنوز قرارمون رو پیدا نکردی؟!";

        }


        if (wrongCount3 === 10 && feedback) {

            feedback.textContent =
                "💀 رسماً دارم برنامه قرار اول رو خودم بهت توضیح میدم.";

        }

    }


    /* =====================================
       QUESTION 4
    ===================================== */

    if (scene === 4) {

        wrongCount4++;


        if (wrongCount4 === 5 && feedback) {

            feedback.textContent =
                "😭 پنج بار اشتباه کردی و هنوز دنبال غذای گرونی؟!";

        }


        if (wrongCount4 === 10 && feedback) {

            feedback.textContent =
                "💀 رستوران رو بیخیال شو، جواب جلوی چشمته.";

        }

    }

}


/* =========================================
   CORRECT ANSWER MESSAGES
========================================= */

const correctMessages1 = [

    "🎯 مظنون شناسایی شد... خودشه!",

    "😂 بالاخره! یه جواب درست هم پیدا شد.",

    "👀 اووووه... پس حواست به من بوده.",

    "😎 اینو خوب اومدی!",

    "🧠 مغز وارد مدار شد... جواب درسته 😂",

    "❤️ آفرین، این یکی رو دقیق زدی.",

    "😂 فعلاً نمره‌ت قبوله، ادامه بده.",

    "🎯 دقیقاً همینه! معلومه یه چیزایی می‌دونی."

];


const correctMessages3 = [

    "🚶‍♂️ آفرین! ساده، آروم و بدون دردسر 😂",

    "❤️ دقیقاً! یه پیاده‌روی ساده می‌تونه شروع خوبی باشه.",

    "😂 بالاخره یه انتخاب منطقی کردی.",

    "🚶‍♂️ خب... قرار اولمون مشخص شد.",

    "🥹 این انتخاب رو دوست داشتم.",

    "😎 ساده ولی قشنگ... همین خوبه."

];


const correctMessages4 = [

    "🌬️ بالاخره! غذای مورد علاقه‌ی آدمای اقتصادی 😂",

    "😂 آب و هوا؟ بودجه کاملاً حفظ شد.",

    "🌬️ شام امشب: اکسیژن با طعم باد!",

    "💀 رستوران‌ها از این انتخابت ناراحت شدن.",

    "😂 هم رایگانه، هم رژیمیه، هم همیشه در دسترسه."

];


/* =========================================
   CORRECT ANSWER
========================================= */

function correctAnswer(button, scene) {

    if (!button) return;


    button.classList.remove("correct");

    void button.offsetWidth;

    button.classList.add("correct");


    const feedback =
        document.getElementById(`feedback-${scene}`);


    let messages;


    if (scene === 1) {

        messages = correctMessages1;

    }

    else if (scene === 3) {

        messages = correctMessages3;

    }

    else if (scene === 4) {

        messages = correctMessages4;

    }

    else {

        return;

    }


    const message =
        messages[
            Math.floor(Math.random() * messages.length)
        ];


    if (feedback) {

        feedback.textContent = message;

        feedback.classList.add("show");

    }


    createHeartRain(8);


    setTimeout(() => {

        if (scene === 1) {

            goToScreen("screen-2");

        }

        else if (scene === 3) {

            goToScreen("screen-4");

        }

        else if (scene === 4) {

            goToScreen("screen-5");

        }

    }, 1100);

}


/* =========================================
   QUESTION 2 — MONEY
========================================= */

const moneyMessages = [

    "💀 واقعاً منو با پول عوض کردی؟!",

    "باشه... حداقل صادق بودی 😂",

    "باشه، برو پولتو بگیر 😑❤️",

    "من اینجا نشسته بودم فکر می‌کردم دوستم داری 😭",

    "پس پول از عشق قوی‌تره؟! 😂",

    "قلبم شکست، ولی حداقل میلیونر میشی 💔😂",

    "این انتخاب رو یادم می‌مونه... 😐"

];


function chooseMoney() {

    const feedback =
        document.getElementById("feedback-2");


    let message;


    if (moneyCount < moneyMessages.length) {

        message = moneyMessages[moneyCount];

    }

    else {

        message =
            moneyMessages[
                Math.floor(Math.random() * moneyMessages.length)
            ];

    }


    moneyCount++;


    if (feedback) {

        feedback.textContent = message;

        feedback.classList.add("show");

    }

}


/* =========================================
   QUESTION 2 — WRONG EXTRA OPTIONS
========================================= */

function wrongChoice2(button) {

    if (!button) return;


    button.classList.remove("wrong");

    void button.offsetWidth;

    button.classList.add("wrong");


    const feedback =
        document.getElementById("feedback-2");


    const messages = [

        "😂 انتخاب جالبی بود... ولی من که اون نیستم.",

        "👀 داری از اصل سؤال فرار می‌کنی؟",

        "😭 نه عزیزم، یه گزینه بهتر هم هست.",

        "💀 این جواب رو اصلاً قبول ندارم.",

        "😂 هنوز گزینه‌ی درست رو ندیدی."

    ];


    const message =
        messages[
            Math.floor(Math.random() * messages.length)
        ];


    if (feedback) {

        feedback.textContent = message;

        feedback.classList.add("show");

    }

}


/* =========================================
   QUESTION 2 — CHOOSE ME
========================================= */

function chooseMe() {

    const feedback =
        document.getElementById("feedback-2");


    if (feedback) {

        feedback.textContent =
            "🥹 انتخاب درست... بالاخره شعور هم پیدا شد.";

        feedback.classList.add("show");

    }


    createHeartRain(10);


    setTimeout(() => {

        goToScreen("screen-3");

    }, 1200);

}


/* =========================================
   PRIVATE MESSAGE
========================================= */

function unlockLetter() {

    createHeartRain(10);


    setTimeout(() => {

        goToScreen("screen-letter");

    }, 500);

}


/* =========================================
   HEART GAME
========================================= */

const arena =
    document.getElementById("heartArena");

const gameHeart =
    document.getElementById("gameHeart");


function moveHeart() {

    if (!arena || !gameHeart) return;


    const padding = 25;


    const maxX =
        Math.max(
            0,
            arena.clientWidth -
            gameHeart.offsetWidth -
            padding
        );


    const maxY =
        Math.max(
            0,
            arena.clientHeight -
            gameHeart.offsetHeight -
            padding
        );


    const x =
        padding +
        Math.random() * maxX;


    const y =
        padding +
        Math.random() * maxY;


    gameHeart.style.left = x + "px";

    gameHeart.style.top = y + "px";

}


/* =========================================
   CATCH HEART
========================================= */

function catchHeart() {

    heartScore++;


    const score =
        document.getElementById("score");


    if (score) {

        score.textContent = heartScore;

    }


    createHeartRain(1);


    if (heartScore < 5) {

        moveHeart();

        return;

    }


    if (gameHeart) {

        gameHeart.style.display = "none";

    }


    if (arena) {

        arena.innerHTML = `

            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                gap:10px;
            ">

                <div style="
                    font-size:65px;
                    color:#ff4778;
                    text-shadow:
                        0 0 45px
                        rgba(255,71,120,.45);
                    animation:pulse 1.2s infinite;
                ">
                    ♥
                </div>

                <strong style="
                    color:#fff;
                    font-size:19px;
                ">
                    گرفتیــــش! 😭
                </strong>

                <span style="
                    color:#777;
                    font-size:11px;
                ">
                    حالا دیگه مال توئه...
                </span>

            </div>

        `;

    }


    createHeartRain(20);


    setTimeout(() => {

        finishGame();

    }, 2200);

}


/* =========================================
   INITIAL HEART POSITION
========================================= */

window.addEventListener("load", () => {

    moveHeart();

});


/* =========================================
   FIRST HELLO — NO BUTTON
========================================= */

const noButton =
    document.getElementById("noButton");


const noMessages = [

    "😂 نه این دکمه وجود نداره",

    "😂 فکر کردی می‌ذارم؟",

    "😂 نه نه... برگرد",

    "💀 این دکمه فقط جنبه تزئینی داره",

    "😭 نه عزیزم، اینجا خبری از نه نیست",

    "😂 بازم نه؟"

];


function runAway() {

    if (!noButton) return;


    noCount++;


    const messageIndex =
        (noCount - 1) % noMessages.length;


    noButton.textContent =
        noMessages[messageIndex];


    noButton.style.position = "fixed";

    noButton.style.zIndex = "9999";


    const padding = 15;


    const maxX =
        Math.max(
            padding,
            window.innerWidth -
            noButton.offsetWidth -
            padding
        );


    const maxY =
        Math.max(
            padding,
            window.innerHeight -
            noButton.offsetHeight -
            padding
        );


    const x =
        padding +
        Math.random() *
        (maxX - padding);


    const y =
        padding +
        Math.random() *
        (maxY - padding);


    noButton.style.left = x + "px";

    noButton.style.top = y + "px";

    noButton.style.transform = "none";

}


/* =========================================
   FINISH
========================================= */

function finishGame() {

    const finalPage =
        document.getElementById("finalPage");


    const experience =
        document.getElementById("experience");


    if (!experience || !finalPage) return;


    experience.style.transition =
        "opacity .8s ease, transform .8s ease, filter .8s ease";


    experience.style.opacity = "0";

    experience.style.transform = "scale(.97)";

    experience.style.filter = "blur(10px)";


    setTimeout(() => {

        finalPage.classList.add("show");

        createHeartRain(35);

        startTyping();

    }, 750);

}


/* =========================================
   FINAL TYPING
========================================= */

function startTyping() {

    const lines =
        document.querySelectorAll(
            "#finalPage .typing-line"
        );


    let index = 0;


    function nextLine() {

        if (index >= lines.length) return;


        const element = lines[index];

        const text = element.dataset.text;


        if (!text) {

            index++;

            nextLine();

            return;

        }


        element.textContent = "";

        element.classList.add("typing");


        let character = 0;

        let speed = 32;


        if (element.classList.contains("important")) {

            speed = 48;

        }


        if (element.closest(".secret-answer")) {

            speed = 65;

        }


        function write() {

            if (character < text.length) {

                element.textContent +=
                    text.charAt(character);

                character++;


                setTimeout(write, speed);

            }

            else {

                element.classList.remove("typing");

                element.classList.add("typed");

                index++;


                setTimeout(nextLine, 380);

            }

        }


        write();

    }


    setTimeout(nextLine, 900);

}


/* =========================================
   HEART RAIN
========================================= */

function createHeartRain(amount) {

    const hearts = [

        "♥",
        "❤",
        "♡",
        "💗",
        "💖",
        "💕"

    ];


    const container =
        document.getElementById("heartRain");


    if (!container) return;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.className = "rain-heart";


        heart.textContent =
            hearts[
                Math.floor(Math.random() * hearts.length)
            ];


        heart.style.left =
            Math.random() * 100 + "vw";


        heart.style.fontSize =
            12 + Math.random() * 22 + "px";


        heart.style.color =
            Math.random() > 0.5
                ? "#ff4778"
                : "#ff91ad";


        heart.style.animationDuration =
            2 + Math.random() * 4 + "s";


        heart.style.animationDelay =
            Math.random() * 0.8 + "s";


        container.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 6000);

    }

}


/* =========================================
   RESTART
========================================= */

function restartGame() {

    location.reload();

}


/* =========================================
   THEME SYSTEM
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("loveTheme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

}


function updateThemeIcon() {

    if (!themeToggle) return;


    const isLight =
        document.body.classList.contains("light-mode");


    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
    );

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");


        const isLight =
            document.body.classList.contains("light-mode");


        localStorage.setItem(
            "loveTheme",
            isLight
                ? "light"
                : "dark"
        );


        updateThemeIcon();

    });

}


updateThemeIcon();


/* =========================================
   INITIAL
========================================= */

updateProgress();