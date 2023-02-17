
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
let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
 return color;
}

