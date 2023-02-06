function openNewContactDialog(){
    document.getElementById('greybackground').classList.remove('d-none');
    document.getElementById('greybackground').classList.add('greyBackground');

    document.getElementById('new-contact-container').classList.remove('d-none');
    document.getElementById('new-contact-container').classList.add('new-contact-template');
}

function closeNewContactDialog(){
    document.getElementById('new-contact-container').classList.remove('new-contact-template');
    document.getElementById('new-contact-container').classList.add('d-none');

    document.getElementById('greybackground').classList.remove('greyBackground');
    document.getElementById('greybackground').classList.add('d-none');
}