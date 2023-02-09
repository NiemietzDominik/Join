
let tasks = []
let users = [];

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


function openGreyBackground(){
    document.getElementById('greybackground').classList.remove('d-none');
    document.getElementById('greybackground').classList.add('greyBackground');
}

function closeGreyBackground(){
    document.getElementById('greybackground').classList.remove('greyBackground');
    document.getElementById('greybackground').classList.add('d-none');
}