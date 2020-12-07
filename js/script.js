/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Global Variables

const maxStudentsPerPage = 9;
let filteredStudentList = [];


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
    // Append element to display if no one matches the search
    noResultsDiv.textContent = 'Sorry Jack, no students here, only malarkey...';
    noResultsDiv.style.fontSize = '1.5rem';
    noResultsDiv.style.margin = '4rem';
    noResultsDiv.style.textAlign = 'center';
    noResultsDiv.style.display = 'none';
    page.appendChild(noResultsDiv);

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