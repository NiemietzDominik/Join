let userName;
let email;
let phoneNumber;

let filteredUsers = [];
let sortedAlphabet = [];
//let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

async function contactList() {
    await init(); // loading array with Users
    loadContact();
}

function loadContact() {
    sortUser(); //Alphabetically sort array with Users  + show`s array in console.log after sorting
    console.table('das sind die alphabetisch sortierten User ', users);

    let firstLetters = users.map(firstChar => firstChar.name[0].toUpperCase()); //generate newArray of firstLetters from User
    console.log('Das sind die Erstbuchstaben vom Vornamen', firstLetters);

    filterCharArray(firstLetters); // Filters all char`s that are more than 2x in this array
    console.log('hier das gefilterte array ohne Buchstaben dublikate', sortedAlphabet);

    setCharDiv(sortedAlphabet, firstLetters);
}

function setCharDiv(sortedAlphabet, firstLetters) {

    addUserToSortList() // filtert die User im Array nach Buchstaben

    console.log('die gefilterten user',filteredUsers)

    for (let i = 0; i < sortedAlphabet.length; i++) {
        
        let list = document.getElementById('contactList'); // Part with div-container which sorts User bei Letters
        
        list.innerHTML += `                                        
            <div id="char${i}">
           <div id="charRegistery" class="char-container">
           ${sortedAlphabet[i]}
           </div>
           <div id="pickUserId${i}" class="pick-user-container">

           </div>   
       </div>`;


        for (let j = 0; j < filteredUsers[i].length; j++) {  

            let filteredUserfirstLetterName = filteredUsers[i][j].name.substring(0, 1).toUpperCase();
            let filteredUserFirstLetterSurname = filteredUsers[i][j].name.split(/\s(.+)/)[1].charAt(0).toUpperCase(); // get first letter of Users Surname

            document.getElementById(`pickUserId${i}`).innerHTML += // Part to push Users into div´s with correct Letter
            `
         <div id="clickUser${i}" class="shortcut-name">
          ${filteredUserfirstLetterName}${filteredUserFirstLetterSurname}
         </div>
         <div>
          <div class="contactList-userName">${filteredUsers[i][j].name}</div>
          <div class="contactList-userEmail">${filteredUsers[i][j].email}</div>
          </div>
            `
        }
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

function sortUser() {
    users.sort(function (a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        return 0;
    });
    
}



async function createNewContact() {
    getValueOfNewContact();
    closeNewContactDialog();
    await backend.setItem('users', JSON.stringify(users));
    clearContactData();
    window.location.reload();

}

function getValueOfNewContact() {
    userName = document.getElementById('newContactName').value;
    email = document.getElementById('newContactEmail').value;
    phoneNumber = document.getElementById('newContactNumber').value;

    let newContact = {
        'name': userName,
        'email': email,
        'phoneNumber': phoneNumber,
    }

    users.push(newContact);
    console.log('user', users);

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
