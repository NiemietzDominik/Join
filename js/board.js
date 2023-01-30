function openAddNewTask(){
    document.getElementById('greybackground').classList.remove('d-none');
    document.getElementById('greybackground').classList.add('greyBackground');

    document.getElementById('addTask-container').classList.remove('d-none');
    document.getElementById('addTask-container').classList.add('addTask-template');
}

function closeAddNewTask(){
    document.getElementById('addTask-container').classList.remove('addTask-template');
    document.getElementById('addTask-container').classList.add('d-none');

    document.getElementById('greybackground').classList.remove('greyBackground');
    document.getElementById('greybackground').classList.add('d-none');
}