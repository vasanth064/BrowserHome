const container = document.querySelector('.container');
const button = document.querySelector('#button');
const searchProviderImage = document.querySelector('#searchProviderImage');
const searchProviderLink = document.querySelector('#searchProviderForm');
const searchField = document.querySelector('#searchField');
const option = document.querySelectorAll('.option');
const selected = document.querySelector('.selected');
const options = document.querySelector('.options');
const todoInput = document.querySelector('#todoForm');
const todoList = document.querySelectorAll('#todoList');
const removeTodoBtn = document.querySelector('#removeTodo');

// navigator.serviceWorker.register('./sw.js');
const select = document.querySelector('select');

// handling direct url searches
searchProviderLink.addEventListener('submit', function (event) {
  if (searchField.includes('.')) {
    event.preventDefault();
    window.location.href = `http://${searchField.value}`;
  }
});

selected.addEventListener('click', () => {
  options.classList.toggle('optActive');
});

// populating provider dropdown with data from searchProvider.js
searchProvider.forEach((provider) => {
  const newOption = document.createElement('li');
  newOption.innerHTML = provider.title;
  newOption.classList.add('option');
  options.appendChild(newOption);
  newOption.addEventListener('click', () => {
    selected.innerHTML = newOption.innerHTML;
    options.classList.remove('optActive');
    changeSearchProvider();
  });
});

// change search provider
function changeSearchProvider() {
  const searchProviderName = selected.innerHTML;
  const provider = searchProvider.filter(
    (provider) => provider.title == searchProviderName
  );

  localStorage.setItem('index', provider[0].index);
  localStorage.setItem('title', provider[0].title);
  localStorage.setItem('link', provider[0].link);
  localStorage.setItem('image', provider[0].image);
  searchProviderImage.setAttribute('src', localStorage.getItem('image'));
  searchProviderLink.setAttribute('action', localStorage.getItem('link'));
}

//populating the quick links data from data.js
data.forEach((row) => {
  const containerRow = document.createElement('div');
  containerRow.classList.add('containerRow');
  container.appendChild(containerRow);

  row.forEach((item) => {
    if (!Array.isArray(item)) {
      containerRow.innerHTML += `
      <a href="${item.link}" class="buttonLink">
        <div class="buttonContainer">
          <img class="buttonIcon" src="${item.icon}" />
          ${item.title ? `<p class='buttonTitle'>${item.title}</p>` : ''}
        </div>
      </a>
      `;
    } else {
      const containerGroup = document.createElement('div');
      containerGroup.classList.add('containerGroup');
      containerRow.appendChild(containerGroup);
      item.forEach((item) => {
        containerGroup.innerHTML += `
        <a href="${item.link}" class="buttonLink">
          <div class="buttonContainer">
          ${
            item.icon
              ? `<img class="buttonIcon" src="${item.icon}" />`
              : `<p class="buttonIcon" >${item.initial}</p>`
          }
          </div>
        </a>
      `;
      });
    }
  });
});

//defining the cache previously used search provider for first time use
if (localStorage.getItem('title') == undefined) {
  localStorage.setItem('title', 'Google');
}
if (localStorage.getItem('todos') == undefined) {
  localStorage.setItem('todos', '[]');
}
//remembering previously used search provider
searchProviderImage.setAttribute(
  'src',
  localStorage.getItem('image') || './images/google.webp'
);
searchProviderLink.setAttribute(
  'action',
  localStorage.getItem('link') || 'http://www.google.com/search'
);
selected.innerHTML = localStorage.getItem('title');

todoInput.addEventListener('submit', (e) => {
  e.preventDefault();
  let todo = {
    id: Date.now(),
    todo: e.target[0].value,
  };
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  e.target.reset();
  appendTodo(todo);
});
const removeTodo = (todoId) => {
  let todos = JSON.parse(localStorage.getItem('todos'));
  let modTodos = todos.filter(({ id }) => id != todoId);
  localStorage.setItem('todos', JSON.stringify(modTodos));
  todoList[0].innerHTML = '';
  todoList[1].innerHTML = '';
  modTodos.map((todo) => {
    appendTodo(todo);
  });
};
const appendTodo = (todo) => {
  const todoItem = document.createElement('li');
  const todoText = document.createElement('p');
  const todoButton = document.createElement('button');
  const todoImg = document.createElement('img');
  todoButton.setAttribute('onClick', `removeTodo(${todo.id})`);
  todoText.innerHTML = todo.todo;
  todoButton.innerHTML = 'X';
  todoImg.classList.add('todoImage');

  if (todo.todo.includes('.')) {
    todoImg.src = `http://www.google.com/s2/favicons?domain=${todo.todo}`;
    todoItem.appendChild(todoImg);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoButton);
    todoList[1].appendChild(todoItem);
  } else {
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoButton);
    todoList[0].appendChild(todoItem);
  }
};

JSON.parse(localStorage.getItem('todos')).map((todo) => {
  todoList[0].innerHTML = '';
  todoList[1].innerHTML = '';
  appendTodo(todo);
});
