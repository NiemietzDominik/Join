function openDropdown(i) {
    let dropdown = document.getElementById(`dropdownTask${i}`);
    dropdown.classList.toggle('dropdown-open');
}

function createTask(){
    let title = document.getElementById('title').innerHTML;
    let description = document.getElementById('description').innerHTML;
    let category = document.getElementById('');

tasks.push({
    "title": title,
    "description": description,
    "category": category,
    "contacts": contact,
    "date": date,
    "prio": prio,
})

console.log(tasks);
}
