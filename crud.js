// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg_Zdgo66nB2Lf4VfClSMuyPd27O87SOc",
  authDomain: "lab08-crud.firebaseapp.com",
  databaseURL: "https://lab08-crud-default-rtdb.firebaseio.com",
  projectId: "lab08-crud",
  storageBucket: "lab08-crud.appspot.com",
  messagingSenderId: "9404332708",
  appId: "1:9404332708:web:2d3df59109c3e342760431"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const database = firebase.database();

const form = document.getElementById('form');
const title = document.getElementById('title');
const content = document.getElementById('content');
const list = document.getElementById('list');
const director = document.getElementById('director');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newItem = {
    title: title.value,
    content: content.value,
    year: year.value,
    duration: duration.value,
    director: director.value
  };

  database.ref('items').push(newItem);
  title.value = '';
  content.value = '';
  year.value = '';
  duration.value = '';
  director.value = '';
  alert("Elemento insertado");
});

database.ref('items').on('value', (snapshot) => {
    list.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
  
      const listItem = document.createElement('tr');
      listItem.innerHTML = `
        <td>${childData.title}</td>
        <td>${childData.director}</td>
        <td>${childData.content}</td>
        <td>${childData.year}</td>
        <td>${childData.duration}</td>
        <td>
          <button class="delete" data-key="${childKey}">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
          <button class="update" data-key="${childKey}">
            <ion-icon name="create-outline"></ion-icon>
          </button>
        </td>
      `;
      list.appendChild(listItem);
  
      const deleteButton = listItem.querySelector('.delete');
      deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        const key = e.target.getAttribute('data-key');
        database.ref('items/' + key).remove();
        prompt("Película eliminada");
      });

      const updateButton = listItem.querySelector('.update');
      updateButton.addEventListener('click', (e) => {
      e.preventDefault();
      const key = e.target.getAttribute('data-key');
      const newTitle = prompt('Nuevo nombre:');
      const newDirector = prompt('Nuevo director:');
      const newContent = prompt('Nueva descripción:');
      const newYear = prompt('Nuevo año:');
      const newDuration = prompt('Nuevo duración:');
      const newData = { title: newTitle, director: newDirector,content: newContent, year: newYear, duration: newDuration };
      database.ref('items/' + key).update(newData);
      });

    });
  });
