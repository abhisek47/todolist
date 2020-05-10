// Define UI variables //

const form = document.querySelector('.task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listners //

loadAllEventListners();

// Load all event listners //

function loadAllEventListners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded',loadItem);
    // Add task event
    form.addEventListener('submit',addItem);
    //  Remove task event
    taskList.addEventListener('click',removeItem);
    // Clear task event
    clearBtn.addEventListener('click',clearItem);
    // Filter task event
    filter.addEventListener('keyup',filterItem);
}

// DOM load event
function loadItem(){
    let item;
    if(localStorage.getItem('items') == null){
        item = [];
    } else {
        item = JSON.parse(localStorage.getItem('items'));
    }

    item.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-conent';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}


// Add Task event
function addItem(e){
    if(taskInput.value === ''){
        alert('Add item');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-conent';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    // Store in local storage
    storeInLocalStorage(taskInput.value);

    taskInput.value = '';
    e.preventDefault()
}

// Store in local storage
function storeInLocalStorage(task){
    let item;
    if(localStorage.getItem('items') == null){
        item = [];
    } else {
        item = JSON.parse(localStorage.getItem('items'));
    }

    item.push(task);
    localStorage.setItem('items',JSON.stringify(item));
}

// Remove task event
function removeItem(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove(); 
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Romove from local storage
function removeFromLocalStorage(taskItem){
    let item;
    if(localStorage.getItem('items') == null){
        item = [];
    } else {
        item = JSON.parse(localStorage.getItem('items'));
    }

    item.forEach(function(task,index){
        if(taskItem.textContent == task){
            item.splice(index,1);
        }
    })

    localStorage.setItem('items',JSON.stringify(item));
}

// Clear task event 
function clearItem(){
    taskList.innerHTML = '';

    clearFromLocalStorage();
}

function clearFromLocalStorage(){
    localStorage.clear();
}

// Filter task event 
function filterItem(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}