

let userName;
let email;
let phoneNumber;
let userId;
let viewDataVisible = false;

let no_value = '';

let filteredUsers = [];
let sortedAlphabet = [];

async function contactList() {
    await init(); // loading array with Users
    loadContact();
}

// functions that load and generate users into contact list | Start

function loadContact() {
    sortUserAlphabetically();

    let firstLetters = users.map(firstChar => firstChar.name[0].toUpperCase()); //generate newArray of firstLetters from User

    filterCharArray(firstLetters); // Filters all char`s that are more than 1x in this array
    setCharDiv(sortedAlphabet, firstLetters);
}

function setCharDiv(sortedAlphabet, firstLetters) {
    addUserToSortList() // pushes sorted Users into newArray of filteredUsers
    console.log(filteredUsers);
    pushUserIntoContactList(sortedAlphabet, firstLetters, filteredUsers)
}

function pushUserIntoContactList(sortedAlphabet, filteredUsers) {
    for (let i = 0; i < sortedAlphabet.length; i++) {
        let list = document.getElementById('contactList');
        generateCharContainer(i, list, sortedAlphabet)
    }
}

function generateCharContainer(i, list, sortedAlphabet) {  // div-container which sorts User bei Letters
    list.innerHTML += `
            <div class="char-container" id="char${i}">
                <div id="charRegistery" class="char-registery">
                    <span style="margin-left: 20px">${sortedAlphabet[i]}</span>
            
                    <div id="userBoxId${i}" class="pick-user-container">
            
                    </div>
            
                </div>
            
            </div>
       `;

    pushUserIntoCharContainer(i, list, sortedAlphabet)
}

function pushUserIntoCharContainer(i) {

    for (let j = 0; j < filteredUsers[i].length; j++) {

        let currentUserId = filteredUsers[i][j].userId;
        console.log(`die UserId an der Stelle ${i}_${j}`, currentUserId)

        let filteredUserfirstLetterName = filteredUsers[i][j].name.substring(0, 1).toUpperCase();

        let filteredUserFirstLetterSurname = filteredUsers[i][j].name.split(/\s(.+)/)[1].charAt(0).toUpperCase() ?? no_value;

        document.getElementById(`userBoxId${i}`).innerHTML += // push Users into div´s with correct Char

            `
    <div onclick="viewUserData(${i}, ${currentUserId})" class="contactList-user">
        <div id="clickUser${i}_${j}" class="shortcut-name">
            ${filteredUserfirstLetterName}${filteredUserFirstLetterSurname}
        </div>
    
        <div>
            <div id="contactName" class="contactList-userName">${filteredUsers[i][j].name}</div>
            <div id="contactEmail" class="contactList-userEmail"><a style="color:#007CEE;">${filteredUsers[i][j].email}</a>
            </div>
        </div>
    </div>
    `
        randomBackgroundColor = document.getElementById(`clickUser${i}_${j}`);
        randomBackgroundColor.style.backgroundColor = filteredUsers[i][j].color


    }

}

function filterCharArray(firstLetters) {
    firstLetters.forEach(element => {
        if (!sortedAlphabet.includes(element)) {
            sortedAlphabet.push(element);
        }
    });
    return sortedAlphabet;
}

function addUserToSortList() {
    filteredUsers = [];
    for (let i = 0; i < sortedAlphabet.length; i++) {
        let filtered = users.filter(user => user.name.toUpperCase().startsWith(sortedAlphabet[i]));
        filteredUsers.push(filtered)
    }
}

function sortChar(i, firstLetterName) {
    alphabet.push(firstLetterName);

}

function sortUserAlphabetically() {
    users.sort(function (a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        return 0;
    });
}

// functions that load and generate users into contact list | End

function viewUserData(i, currentUserId) {

    let viewDataTemplate = document.getElementById('view-contact');



    if (viewDataVisible == false) {
        filterUserById(currentUserId);
        viewDataVisible = true;

        viewDataTemplate.classList.toggle("slide");
        console.log(clickedUser[0]);

        generateViewData(viewDataTemplate, i, clickedUser);

    } else if (viewDataVisible == true && currentUserId !== clickedUser[0].userId) {

        filterUserById(currentUserId);

        viewDataTemplate.classList.toggle("slide");

        setTimeout(() => {
            generateViewData(viewDataTemplate, i, clickedUser)
            viewDataTemplate.classList.toggle("slide");
        }, 200);

    }
}



function generateViewData(viewDataTemplate, i, clickedUser) {

    for (let j = 0; j < filteredUsers[i].length; j++) {

        returnViewDataHTML(viewDataTemplate, i, j, clickedUser)
        setRandomColorforContact(i, j);

        document.documentElement.style.setProperty('--userColor', clickedUser[0].color);
    }
}

function setFirstLetterOfName(clickedUser) {
    let returnObjectOfCharsArray = {}
    return filteredUserfirstLetterName, filteredUserFirstLetterSurname
}

function setRandomColorforContact(i, j) {
    randomBackgroundColorViewContact = document.getElementById(`shortcut_name${i}${j}`);
    randomBackgroundColor = document.getElementById(`clickUser${i}_${j}`);
}


function filterUserById(currentUserId) {
    clickedUser = users.filter(function (checkId) {
        return checkId.userId == currentUserId;
    })
}

function returnViewDataHTML(viewDataTemplate, i, j, clickedUser) {
    let filteredUserfirstLetterName = clickedUser[0].name.substring(0, 1).toUpperCase();
    let filteredUserFirstLetterSurname = clickedUser[0].name.split(/\s(.+)/)[1].charAt(0).toUpperCase() ?? no_value;
    return viewDataTemplate.innerHTML = `
    <div>
        <div class="view-contact-header">
            <div class="contactList-user-view-contact">
                <div id="shortcut_name${i}${j}" class="shortcut-name shortcut-name-view-contact">
    
                    ${filteredUserfirstLetterName}${filteredUserFirstLetterSurname}
                </div>
    
                <div>
                    <div id="contactName" class="contactList-userName contact-list-username-view-contact">
                        ${clickedUser[0].name}
                    </div>
                    <div id="contactEmail" class="contactList-userEmail">
                        <a>
                            <img style="margin-right: 10px;" src="assets/img/plus_icon.png">${clickedUser[0].email}
                        </a>
                    </div>
                </div>
            </div>
    
    
        </div>
    
        <div class="view-contact-middlePart">
            <div>Contact Information</div>
            <div onclick="openEditContactDialog()" class="edit-contact-button"><img src="assets/img/edit_pen_icon.png"> Edit Contact
            </div>
        </div>
    
        <div class="view-contact-footer">
            <div class="contact-info-div">
                <div style="font-weight: 700; margin-bottom: 10px;">Email</div>
                <div><a href="mailto:${clickedUser[0].email}">
                        ${clickedUser[0].email}
                    </a></div>
            </div>
            <div class=" contact-info-div">
                <div style="font-weight: 700; margin-bottom: 10px;">Phone</div>
                <div>${clickedUser[0].phoneNumber}</div>
            </div>
        </div>
    </div>`
}








// functions to create a new contact | Start 

async function createNewContact() {
    getValueOfNewContact();
    closeDialog();
    await backend.setItem('users', JSON.stringify(users));
    clearContactData();
    //await backend.deleteItem('users');// delete all User from users Array
    window.location.reload(); // reloads the page
}

function getValueOfNewContact() {
    userName = document.getElementById('newContactName').value;
    email = document.getElementById('newContactEmail').value;
    phoneNumber = document.getElementById('newContactNumber').value;

    userId = generateUserId();

    assignedRandomColor = generateNewColor();

    let newContact = {
        'name': userName,
        'email': email,
        'phoneNumber': phoneNumber,
        'color': assignedRandomColor,
        'userId': userId,
    }

    users.push(newContact);
}

function generateUserId() {
    return generatedUserIdByTime = new Date().getTime();
}

function clearContactData() {
    userName.innerHTML = ``;
    email.innerHTML = ``;
    phoneNumber.innerHTML = ``;
}

function openNewContactDialog() {
    openGreyBackground();
    document.getElementById('new-contact-container').classList.remove('d-none');

    createNewContactHTML();

}

function createNewContactHTML() {

    return document.getElementById('new-contact-container').innerHTML =
        `
        <div id="new-contact-container" class="new-contact-template">
    <div id="new-contactId" class="new-contact-template-wrapper">
        <div class="left-side-new-contact-container">
            <div> <img src="assets/img/logo_add_new_contact.png"></div>
            <div style="position:relative">
                <div style="font-size:  61px; font-weight: 700;">Add contact</div>
                <div style="font-size: 27px; font-weight: 400;">Tasks are better with a Team!</div>
                <div class="mini-border"></div>
            </div>

        </div>


        <div class="right-side-container-structure">

            <div onclick="closeDialog()"
                style="position: absolute; top: 30px; right: 30px; height: 15px; cursor:pointer;"><img
                    src="assets/img/x.png"></div>
            <div class="right-side-new-contact-container">
                <div class="placeholder-div">
                    <img style="height:50px; width:40px;" src="assets/img/placeholder_profil.png">
                </div>
                <div>
                    <div class="input-container">

                        <div class="input-div"><input id="newContactName" class="input-field" placeholder="Name"
                                type="text"> <img class="contact-mini-icon" src="assets/img/contact_icon.png" alt="">
                        </div>
                        <div class="input-div"><input id="newContactEmail" class="input-field" placeholder="Email"
                                type="email"> <img class="contact-mini-icon" src="assets/img/email_icon.png"> </div>
                        <div class="input-div"><input id="newContactNumber" class="input-field" placeholder="Phone"
                                type="number">
                            <img class="contact-mini-icon" src="assets/img/phone_icon.png">
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-div-contact">
                <button onclick="closeDialog()" class="footer-btn-clear-contact-form">Cancel <div
                        class="cancel_x">x</div></button>
                <button onclick="createNewContact()" class="footer-btn-create-contact">Create contact<img
                        src="assets/img/clear.png"></button>
            </div>
        </div>
    </div>
</div>
`
}

function closeDialog() {
    document.getElementById('new-contact-container').classList.remove('new-contact-template');
    document.getElementById('new-contact-container').classList.add('d-none');
    closeGreyBackground();
}

// functions to create a new Contact | End

// functions to edit a Contact | Start


function openEditContactDialog() {
    openGreyBackground();
    document.getElementById('new-contact-container').classList.remove('d-none');

    createEditContactHTML();
}


function createEditContactHTML() {
    let filteredUserfirstLetterName = clickedUser[0].name.substring(0, 1).toUpperCase();
    let filteredUserFirstLetterSurname = clickedUser[0].name.split(/\s(.+)/)[1].charAt(0).toUpperCase() ?? no_value;

    console.log('angeklickter User', clickedUser[0])
    return document.getElementById('new-contact-container').innerHTML =
        `
    <div id="new-contact-container" class="new-contact-template">
<div id="new-contactId" class="new-contact-template-wrapper">
    <div class="left-side-new-contact-container">
        <div> <img src="assets/img/logo_add_new_contact.png"></div>
        <div style="position:relative">
            <div style="font-size:  61px; font-weight: 700;">Edit contact</div>
            <div class="mini-border"></div>
        </div>

    </div>

    <div class="right-side-container-structure">

        <div onclick="closeDialog()"
            style="position: absolute; top: 30px; right: 30px; height: 15px; cursor:pointer;"><img
                src="assets/img/x.png"></div>
        <div class="right-side-new-contact-container">
        
            <div class="placeholder-div" style="font-size: 47px; background:${clickedUser[0].color}">  ${filteredUserfirstLetterName}${filteredUserFirstLetterSurname}
            </div>

            <div>
                <div class="input-container">

                    <div class="input-div"><input value="${clickedUser[0].name}" id="editContactName" class="input-field" placeholder="Name"
                     type="text"> <img class="contact-mini-icon" src="assets/img/contact_icon.png" alt="">
                    </div>
                    <div class="input-div"><input value="${clickedUser[0].email}" id="editContactEmail" class="input-field" placeholder="Email"
                            type="email"> <img class="contact-mini-icon" src="assets/img/email_icon.png"> </div>
                    <div class="input-div"><input value="${clickedUser[0].phoneNumber}" id="editContactNumber" class="input-field" placeholder="Phone"
                            type="number">
                        <img class="contact-mini-icon" src="assets/img/phone_icon.png">
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-div-contact">
            <button onclick="closeDialog()" class="footer-btn-clear-contact-form">Cancel <div
                    class="cancel_x">x</div></button>
            <button onclick="editContact()" class="footer-btn-create-contact">Create contact<img
                    src="assets/img/clear.png"></button>
        </div>
    </div>
</div>
</div>
`
}

async function editContact(){

    userName = document.getElementById('editContactName').value;
    email = document.getElementById('editContactEmail').value;
    phoneNumber = document.getElementById('editContactNumber').value;
   
    clickedUser[0].name = userName;
    clickedUser[0].email = email;
    clickedUser[0].phoneNumber = phoneNumber;

    addUserToSortList()
    closeDialog();
    await backend.setItem('users', JSON.stringify(users));
    window.location.reload();
   

}


function closeEditContactDialog() {
    document.getElementById('new-contact-container').classList.remove('new-contact-template');
    document.getElementById('new-contact-container').classList.add('d-none');
    closeGreyBackground();
}


// functions to edit a Contact | End

