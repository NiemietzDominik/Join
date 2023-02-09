function openAddNewTaskDialog() {
    openGreyBackground()
    document.getElementById('addTask-container').classList.remove('d-none');
    document.getElementById('addTask-container').classList.add('addTask-template');
}

function closeAddNewTaskDialog() {
    document.getElementById('addTask-container').classList.remove('addTask-template');
    document.getElementById('addTask-container').classList.add('d-none');
    closeGreyBackground();
}