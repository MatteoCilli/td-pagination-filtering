/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Global Variables
const page = document.querySelector('.page');
const pageHeader = document.querySelector('.header');
const fullStudentList = data;
const maxStudentsPerPage = 9;
let filteredStudentList = [];
let searchString = '';

const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchInputIMG = document.createElement('img');
const pageButtonsDiv = document.createElement('div');
const pageButtonsUl = document.createElement('ul');
const noResultsDiv = document.createElement('div');

// Append elements to create a search bar
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchInputIMG.src = 'img/search.png'
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchInputIMG);
pageHeader.appendChild(searchDiv);

// Append elements for pagination buttons
pageButtonsDiv.className = 'pagination';
pageButtonsDiv.appendChild(pageButtonsUl);
page.appendChild(pageButtonsDiv);

// Append element to display if no one shows up to the party
noResultsDiv.textContent = 'Sorry Jack, no students here, only malarkey...';
noResultsDiv.style.fontSize = '1.5rem';
noResultsDiv.style.margin = '4rem';
noResultsDiv.style.textAlign = 'center';
noResultsDiv.style.display = 'none';
page.appendChild(noResultsDiv);

// function to generate list items
function generateListItem(student) {
    const listItem = document.createElement('li');
    listItem.className = 'student-item cf';
    listItem.innerHTML = `
      <div class="student-details">
         <img class="avatar" src="${student.picture.large}">
         <h3>${student.name.first} ${student.name.last}</h3>
         <span class="email">${student.email}</span>
      </div>
      <div class="joined-details">
         <span class="date">Joined ${student.registered.date}</span>
      </div>
    `;
    return listItem;
}

//** showPage function

const showPage = (list, button) => {
    const ul = document.querySelector('.student-list');
    ul.innerHTML = '';

    // If no results, display message
    if (list.length === 0) {
        noResultsDiv.style.display = 'block';
    }
    // else display students based on page button selection
    else {
        let indexStart = ((button - 1) * maxStudentsPerPage);
        let indexEnd = (indexStart + maxStudentsPerPage);
        for (let i = indexStart; i < indexEnd && i < list.length; i++) {
            const li = generateListItem(list[i]);
            ul.appendChild(li);
        }
        noResultsDiv.style.display = 'none';
    }
};

//** addPagination function

const addPagination = (studentList) => {
    let numOfStudents = studentList.length;
    let numPages = Math.ceil(numOfStudents / maxStudentsPerPage);

    let selectedButton = 1;
    pageButtonsUl.innerHtml = '';

    // calling showPage function
    showPage(studentList, selectedButton);

    // equally distribute buttons among the people, comrade
    for (let i = 0; i < numPages; i++) {
        let button = document.createElement('li');
        let btnAnchor = document.createElement('a');
        btnAnchor.href = '#/';
        // Activate the first button
        if (i === 0) {
            btnAnchor.className = 'active';
        }
        btnAnchor.textContent = i + 1;
        button.appendChild(btnAnchor);
        pageButtonsUl.appendChild(button)
    }

    // update page when new page button clicked
    pageButtonsUl.addEventListener('click', (e) => {
        let previousButton = document.querySelector('.active');
        previousButton.className = '';
        selectedButton = e.target.textContent;
        if (selectedButton != '12345') {
            e.target.className = 'active';
            showPage(studentList, selectedButton);
        } else {
            e.preventDefault;
        }
    });
};

// update filteredStudentList using search query and refresh page
const filterQuery = () => {
    filteredStudentList = [];
    if (searchString.length === 0) {
        // use fullStudentList is searchString is empty
        showPage(fullStudentList);
    } else {
        for (let i = 0; i < fullStudentList.length; i++) {
            let name = fullStudentList[i].name.first.toLowerCase();
            let surname = fullStudentList[i].name.last.toLowerCase();
            // if the student's name or surname contains the search query substring
            if (name.includes(searchString) || (surname.includes(searchString))) {
                // add student to filteredStudentList
                filteredStudentList.push(data[i]);
            }
        }
        showPage(filteredStudentList);
    }
};

searchInput.addEventListener('input', () => {
    searchString = searchInput.value;
    filterQuery();
});


// call initially 
addPagination(fullStudentList);