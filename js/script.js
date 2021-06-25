/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


const searchForm = document.querySelector('.header');
// Creating HTML for search form;
const htmlElement = `<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`
// adding HTML to Header;
searchForm.insertAdjacentHTML('beforeend', htmlElement);
const input = document.querySelector('#search');
const itemPerPage = 9;

// function to display HTML Element on Web Page;
function showPage(list, page){
   const startIndex = (page * itemPerPage) - itemPerPage;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   if(list.length === 0){
      const div = `<div class="no-results">No result found</div>`;
      studentList.insertAdjacentHTML('beforeend', div);
   }
   
   for(let i = 0; i < list.length; i++){
      const studentData = list[i];
      if(i >= startIndex && i < endIndex){
         const fullName = `${studentData.name.first} ${studentData.name.last}`;
         const img = studentData.picture.large;
         const email = studentData.email;
         const date = studentData.registered.date;

         const studentItem = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src=${img} alt="Profile Picture">
           <h3>${fullName}</h3>
           <span class="email">${email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${date}</span>
         </div>
       </li>`
           studentList.insertAdjacentHTML('beforeend', studentItem);
      } 
   }
   return list;
}

showPage(data, 1);


// function to add elements for pagination button;
function addPagination(list){
   const numOfPage = Math.ceil(list.length / itemPerPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for(let i = 1; i <= numOfPage; i++){
      let button = `<li>
      <button type="button">${i}</button>
     </li>`
     linkList.insertAdjacentHTML('beforeend', button);
   }
   const firstButton = linkList.querySelector('button');
   if(firstButton){
      firstButton.className = "active";
   }
  
  linkList.addEventListener('click', (e) =>{
   if(e.target.tagName === 'BUTTON'){
      const button = e.target;
      const pageNumber = button.textContent;
     
     const activeButton = linkList.querySelector('.active');
   
     if(activeButton){
        activeButton.classList.remove('active');
     }
     button.className = "active";  
     showPage(list, button.textContent);
   }
   return list;
})
}


addPagination(data);

// function to display Search Items;
function showSearch(){
    const newArray = data.filter(n => {
         const fname = n.name.first.toUpperCase();
         const userInput = input.value.toUpperCase();
         return fname.includes(userInput); 
   })
     
   showPage(newArray, 1);
   addPagination(newArray)
}

input.addEventListener('keyup', showSearch)




