
let count = 0;
let elapsedTime = 0;
const timeLimit = 20;

let parsedTime, interval;

let startTime = Date.now();

const timerEl = document.getElementById("timer");
const countEl = document.getElementById("tapCount");
const tapEl = document.getElementById("tapper");

function onStart(){
    document.body.setAttribute('data-active', 'true');

    startTime = Date.now();
    interval = setInterval(function(){
        updateDisplay(Date.now() - startTime);
    });
}

function onTap() {
    count++;
    countEl.innerHTML = count;

    if(count === 1){
        onStart();
    }
}

function onReset(){
    tapEl.disabled = false;
    elapsedTime = 0;
    parsedTime = 0;
    count = 0;
    timerEl.innerHTML = 0;
    countEl.innerHTML = 0;

    document.body.setAttribute('data-active', 'false');
    document.body.setAttribute('data-done', 'false');
}

function onEnd(){
    tapEl.setAttribute('disabled', '');
    clearInterval(interval);

    elapsedTime = timeLimit;
    parsedTime = timeLimit;

    timerEl.innerHTML = timeLimit.toString();

    document.body.setAttribute('data-active', 'false');
    document.body.setAttribute('data-done', 'true');
}

function updateDisplay(currentTime){
    parsedTime = (currentTime / 1000).toFixed(1);
    timerEl.innerHTML = parsedTime;
    
    if(parsedTime >= timeLimit){
        onEnd();
    }   
}

let isTouchDevice = function () {
    return (
        !!(typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
                (window.DocumentTouch &&
                    typeof document !== 'undefined' &&
                    document instanceof window.DocumentTouch))) ||
        !!(typeof navigator !== 'undefined' &&
            (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
    );
};

window.addEventListener('load', function () {
    document.body.setAttribute("data-touch", isTouchDevice());
    document.addEventListener("touchstart", function() {}, true);
});