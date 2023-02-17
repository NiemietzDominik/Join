
let tasks = [];
let users = [];
let symbols = "0123456789ABCDEF";
let color = "#";
let generatedColor;

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


function openGreyBackground() {
    document.getElementById('greybackground').classList.remove('d-none');
    document.getElementById('greybackground').classList.add('greyBackground');
}

function closeGreyBackground() {
    document.getElementById('greybackground').classList.remove('greyBackground');
    document.getElementById('greybackground').classList.add('d-none');
}

function generateNewColor() {
const limitValue = 256;
let red = getRandomNumber(limitValue);
let green = getRandomNumber(limitValue);
let blue = getRandomNumber(limitValue);

return `rgb(${+ red},${+ green},${+ blue})`
}

function getRandomNumber(limitValue){
    return Math.floor(Math.random() * limitValue);
}