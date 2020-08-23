//This is the big empty array
const songs = [];

//Drag all of the elements needed

const addBtn = document.querySelector('form');
const form = document.querySelector('.form');
const newList = document.querySelector('.filtering');
const newLists = document.querySelector('.ListsSong');

// To show the new lists of the songs from the input

const showListsSongs = e => {
  console.log(e);

  //create html to handle the form of the new list of songs
  const listHtml = songs.map(song => {
    return `
      <ul>
        <li>
          <p>artist picture</p>
          ${song.img}
        </li>
        <li>
          <p>Song's name: ${song.title}</p>${song.style}
        </li>
        <li>
          <p>Artist name: ${song.name}</p>${song.length}
        </li>
        <li>Score: ${song.id ? 0 : id++}</li>
        <li>
        <button value="${song.id}" class="increament">+1</button></li>
        <li><button value="${song.id}" class="delete">X</button></li>
      </ul>
    `}).join('');
  newLists.innerHTML = listHtml;
};

// To add the lists

const addListsSong = e => {
  e.preventDefault();
  const formSong = e.currentTarget;

  const newListSong = {
    title: formSong.title.value,
    name: formSong.name.value,
    style: formSong.style.value,
    length: formSong.length,
    img: formSong.img,
    id: Date.now(),
  }
  songs.push(newListSong);
  newList.dispatchEvent(new CustomEvent('listUpdated'));
  formSong.reset();
}

//Handling the click for deleting or increamenting the number

const handleClick = e => {

  //If the increament button is clicked then push the increament number

  const clickBtn = e.target.closest('button.increament');

  if(clickBtn) {
    const id = Number(clickBtn.value);
    increamentNum(id);
  }
  
  //If the lick delete button is clicked the list should be removed

  const clickDel = e.target.closest('button.delete');

  if(clickDel) {
    const id = Number(clickDel.value);
    deleteBtn(id);
  }
}

  //This function is handling the increament of the number for in the score

const increamentNum = id => {
  console.log(id);
    if(id === 0) {
      id++;
    }
    newList.dispatchEvent(new CustomEvent('listUpdated'));
}

// This function is handling the deleting list from

const deleteBtn = id => {
  songs = songs.filter(song => song.id !== id);
  newList.dispatchEvent(new CustomEvent('listUpdated'));
};

//The local storage

const updateLocalStorage = () => {
  localStorage.setItem("songs", JSON.stringify(songs));
 };

const toLocalStorage = () => {
  const mySongs = JSON.parse(localStorage.getItem('songs'));
  console.log('hello', mySongs);
  if(!mySongs) {
    songs;
  } else {
    songs = mySongs;
  }
  newList.dispatchEvent(new CustomEvent('listUpdated'));
 };


//All of the listening clicks

newList.addEventListener('click', handleClick);
newList.addEventListener('listUpdated', showListsSongs);
newList.addEventListener('listUpdated', updateLocalStorage);
addBtn.addEventListener('submit', addListsSong);

toLocalStorage();