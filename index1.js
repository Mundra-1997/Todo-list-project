window.addEventListener('load',function(){
todos = JSON.parse(localStorage.getItem('todos')) || [];
 const nameinput = document.querySelector('#name');
 const newTodoform = document.querySelector('#new-todo-form');
 const username = localStorage.getItem('username') || '';
 nameinput.value = username;
 nameinput.addEventListener('change',function(e){
     localStorage.setItem('username',e.target.value);
 })
 newTodoform.addEventListener('submit',function(e){
    e.preventDefault();
    const todo = {
        content:e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime()
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
    e.target.reset();
    displayTodos();
    
 })
 displayTodos();
    
})
function displayTodos(){
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    todos.sort((a,b)=>a-b).forEach(todo=>{
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const action = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if(todo.category == 'personal'){
            span.classList.add('personal');
        }
        else{
            span.classList.add('work');
        }
          content.classList.add('todo-content');
          action.classList.add('actions');
          edit.classList.add('edit');
          deleteButton.classList.add('delete');

          content.innerHTML = `<input type="text" value = "${todo.content}" readonly>`;
          edit.innerHTML = 'edit';
          deleteButton.innerHTML = 'Delete';

          label.appendChild(input);
          label.appendChild(span);
          action.appendChild(edit);
          action.appendChild(deleteButton);
          todoItem.appendChild(label);
          todoItem.appendChild(content);
          todoItem.appendChild(action);

          todoList.appendChild(todoItem);
         if(todo.done){
            todoItem.classList.add('done');
         }
         input.addEventListener('click',function(e){
            todo.done = e.target.checked;
            localStorage.setItem('todos',JSON.stringify(todos));
            if(todo.done){
                todoItem.classList.add('done');
            }
            else{
                todoItem.classList.remove('done');
            }
            displayTodos();
         })
         edit.addEventListener('click',function(e){
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur',function(e){
                input.setAttribute('readonly',true);
                todo.content = e.target.value;
                localStorage.setItem('todos',JSON.stringify(todos));
                displayTodos();
            })
         })
         deleteButton.addEventListener('click',function(e){
            todos = todos.filter(t=>t!= todo);
            localStorage.setItem('todos',JSON.stringify(todos));
            displayTodos();
         })
    })
}
