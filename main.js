const preloader = document.querySelector('.preloader');
preloader.classList.add('active-loader');

window.onload = () => todoFunc();

function todoFunc() {
  preloader.classList.remove('active-loader');
  //localStorage.removeItem('taskLists');
  const btn = document.querySelector('.btn');
  const form = document.querySelector('form');
  const container = document.querySelector('.container');
  const input = document.getElementById('input');
  const total = document.querySelector('.total--task');
  
 let taskLists =   JSON.parse(localStorage.getItem('taskLists')) || [];
  
  // Listen to submit
  form.addEventListener('submit', addTask);
  
  function addTask(){
    if(!input.value) return;
    console.log("input is not empty");
    const task = input.value;
    
    taskLists.push({title: task, id: Math.random() * 1000});
    // Add task to local storage
    addToStorage(taskLists);
   
  }
  function addToStorage(arr){
    let taskKey = `${arr.id}`;
    console.log(taskKey);
   let taskList = localStorage.setItem('taskLists', JSON.stringify(arr));
  }
  
  
  function renderUi(){
    total.innerHTML = taskLists.length;
   taskLists.forEach(task => {
     
     let card = document.createElement('div');
     let avatar = document.createElement('div');
     let span = document.createElement('span');
     let p = document.createElement('p');
     let actionBtns = document.createElement('div');
     let del = document.createElement('button');
     let edit = document.createElement('button');
    
    // Adding varous value to all elements
    del.setAttribute('id', task.id);
    span.innerText = `${task.title[0]}`;
    p.innerText = `${task.title}`;
    del.innerHTML = '<i class="fas fa-trash"></i>';
    edit.innerHTML= '<i class="fas fa-pen"    <div class="loader"></div/>';
     
    // Adding classes to all elem
    card.classList.add('card');
    avatar.classList.add('avatar');
    p.classList.add('content');
    actionBtns.classList.add('actionBtns');
    del.classList.add('del');
    edit.classList.add('edit');
    
    // Append elem to various elem
    card.appendChild(avatar);
    card.appendChild(actionBtns);
    avatar.appendChild(span);
    avatar.appendChild(p);
    actionBtns.appendChild(del);
    actionBtns.appendChild(edit);
   card.animate({
      opacity: [0,1],
      easing: 'ease-in-out'
      }, 1000);
    container.append(card);
   
    edit.addEventListener('click', () => {
      taskLists.forEach(item => {
        if(item.id === task.id){
          let newText = task.title;
          btn.innerText = "edit task";
          input.value = newText;
         form.onsubmit = () => {
           item.title = newText;
           taskLists.splice(item, 1);
           localStorage.setItem('taskLists', JSON.stringify(taskLists));
           document.location.reload();
         }
        }
      })
    })
    del.addEventListener('click', e => {
      taskLists.forEach(item => {
        if(item.id == task.id){
          taskLists.splice(item, 1);
          localStorage.setItem('taskLists', JSON.stringify(taskLists));
          document.location.reload();
        }
      })
    });
   });
  }
  renderUi();
  }