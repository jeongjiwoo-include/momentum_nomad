const clockContainer = document.querySelector(".js-clock"); //selector로 js-clock class 
const clockTitle = clockContainer.querySelector("h1"); //selector로 clockcontainer 자식들 받아옴

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText =
    `${hours < 10 ? `0${hours}` : hours }:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; //ternary operator : (condition) ? (then) : (else)
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();