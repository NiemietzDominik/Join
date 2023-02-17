let userName;
let email;
let phoneNumber;

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

           <div id="pickUserId${i}" class="pick-user-container">

           </div> 

           </div>
            
       </div>`;

    pushUserIntoCharContainer(i, list, sortedAlphabet)
}

function pushUserIntoCharContainer(i) { 


    for (let j = 0; j < filteredUsers[i].length; j++) {

        let filteredUserfirstLetterName = filteredUsers[i][j].name.substring(0, 1).toUpperCase();

        let filteredUserFirstLetterSurname = filteredUsers[i][j].name.split(/\s(.+)/)[1].charAt(0).toUpperCase() ?? no_value;

        document.getElementById(`pickUserId${i}`).innerHTML += // push Users into div´s with correct Char
            `
       <div onclick="viewUserData(${i})" class="contactList-user">
     <div id="clickUser${i}_${j}" class="shortcut-name">
      ${filteredUserfirstLetterName}${filteredUserFirstLetterSurname}
     </div>

     <div>
      <div id="contactName" class="contactList-userName">${filteredUsers[i][j].name}</div>
      <div id="contactEmail" class="contactList-userEmail"><a style="color:#007CEE;">${filteredUsers[i][j].email}</a></div>
      </div>
      </div>

    `

    randomBackgroundColor = document.getElementById(`clickUser${i}_${j}`);

    randomBackgroundColor.style.backgroundColor = filteredUsers[i][j].color;

    
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
    for (let i = 0; i < sortedAlphabet.length; i++) {
        let filtered = users.filter(user => user.name.toUpperCase().startsWith(sortedAlphabet[i]));
        filteredUsers.push(filtered)
    }
}

function sortChar(i, firstLetterName) {
    alphabet.push(firstLetterName);
    console.log(alphabet);
}

function sortUserAlphabetically() {
    users.sort(function (a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        return 0;
    });
}

// functions that load and generate users into contact list | End

function viewUserData(i) {
    let viewDataTemplate = document.getElementById('view-contact');
    viewDataTemplate.classList.toggle("slide-in");

    let getVariable = filteredUsers[i];
    console.log(getVariable);

    for (let j = 0; j < filteredUsers[i].length; j++) {

        let filteredUserfirstLetterName = filteredUsers[i][j].name.substring(0, 1).toUpperCase();

        let filteredUserFirstLetterSurname = filteredUsers[i][j].name.split(/\s(.+)/)[1].charAt(0).toUpperCase() ?? no_value;


        viewDataTemplate.innerHTML = `
    <div>
    <div class="view-contact-header">
        <div class="contactList-user-view-contact">
            <div id="shortcut_name${j}" class="shortcut-name shortcut-name-view-contact">
                
      ${filteredUserfirstLetterName}${filteredUserFirstLetterSurname}
            </div>

            <div>
                <div id="contactName"
                    class="contactList-userName contact-list-username-view-contact">${filteredUsers[i][j].name}
                </div>
                <div id="contactEmail" class="contactList-userEmail">
                    <a>
                        <img style="margin-right: 10px;"
                            src="assets/img/plus_icon.png">UserEmail
                    </a>
                </div>
            </div>
        </div>


    </div>

    <div class="view-contact-middlePart">
        <div>Contact Information</div>
        <div class="edit-contact-button"><img src="assets/img/edit_pen_icon.png"> Edit Contact
        </div>
    </div>

    <div class="view-contact-footer">
        <div class="contact-info-div">
            <div style="font-weight: 700; margin-bottom: 10px;">Email</div>
            <div><a href="mailto:${filteredUsers[i][j].email}">
            ${filteredUsers[i][j].email}
                </a></div>
        </div>
        <div class=" contact-info-div">
            <div style="font-weight: 700; margin-bottom: 10px;">Phone</div>
            <div>${filteredUsers[i][j].phoneNumber}</div>
        </div>
    </div>
</div>`

randomBackgroundColor = document.getElementById(`shortcut_name${j}`);

randomBackgroundColor.style.backgroundColor = filteredUsers[i][j].color;


    }
}



// functions to create a new contact | Start 

async function createNewContact() {
    getValueOfNewContact();
    closeNewContactDialog();
    await backend.setItem('users', JSON.stringify(users));
    clearContactData();
    // await backend.deleteItem('users');// delete all User from users Array
    window.location.reload(); // reloads the page
}

function getValueOfNewContact() {
    userName = document.getElementById('newContactName').value;
    email = document.getElementById('newContactEmail').value;
    phoneNumber = document.getElementById('newContactNumber').value;

    assignedRandomColor = generateNewColor();

    let newContact = {
        'name': userName,
        'email': email,
        'phoneNumber': phoneNumber,
        'color': assignedRandomColor,
    }

    users.push(newContact);
}

function clearContactData() {
    userName.innerHTML = ``;
    email.innerHTML = ``;
    phoneNumber.innerHTML = ``;
}

function openNewContactDialog() {
    openGreyBackground()
    document.getElementById('new-contact-container').classList.remove('d-none');
    document.getElementById('new-contact-container').classList.add('new-contact-template');

}

function closeNewContactDialog() {
    document.getElementById('new-contact-container').classList.remove('new-contact-template');
    document.getElementById('new-contact-container').classList.add('d-none');
    closeGreyBackground();
}

// functions to create a new Contact | End
