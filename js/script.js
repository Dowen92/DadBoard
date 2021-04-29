  const getJokeButton = document.getElementById("getJokeButton");
  getJokeButton.addEventListener("click", getJoke);
  const jokeText = document.getElementById("jokeText");
  getJoke();

  const storageName = 'jokes';

  const noJokeText = document.getElementById('no-joke');

  const punchLineButton = document.getElementById('punchLineButton');
  punchLineButton.addEventListener("click", playSound);

  const audio = document.getElementById("audio");
  const jokesContainer = document.getElementById("jokes-container");
  function playSound()
  {
    audio.currentTime = 0;
    audio.play();
  }

  function getJoke()
  {
    let request = new XMLHttpRequest();
  
    request.open('GET', 'https://icanhazdadjoke.com/', true);
    request.setRequestHeader("Accept", "text/plain");

    request.onload = function () {
      document.getElementById("jokeText").innerText = this.response;
    }

    request.send();
  }

  const jokeElementParent = document.getElementById("list-container");
  let jokeElement;
  const addJokeButton = document.getElementById("addJokeButton");
  addJokeButton.addEventListener("click", addJoke);

  let jokes = [];

  const jokesInput = document.getElementById("jokeInput");

  if(localStorage.getItem(storageName) != null)
  {
      jokes = JSON.parse(localStorage.getItem(storageName));

      if(jokes.length <= 0)
        noJokeText.classList.remove('is-hidden');

      jokes.forEach(jokeObject => {
        createJokeElement(jokeObject);
      });
  }
  else
  {
    noJokeText.classList.remove('is-hidden');
  }

  function addJoke()
  {
      let joke = jokesInput.value;
    jokesInput.value = "";
      if(joke.trim().length <= 0)
          return;
      
      let jokeObject = {
        joke: joke.trim(),
        done: false,
        index: jokes.length
      }    
          console.log(jokeObject);
      jokes.push(jokeObject);

      localStorage.setItem(storageName, JSON.stringify(jokes));

      createJokeElement(jokeObject);

      noJokeText.classList.add('is-hidden');
  }

  function createJokeElement(jokeObject)
  {
    
    jokeElement = document.createElement('div');
    jokeLineElement = document.createElement('div');
    jokeLineElement.classList.add("joke-row");
    jokeElement.appendChild(jokeLineElement);

    let doneButtonElement = document.createElement('button');
    doneButtonElement.classList.add("button");
    doneButtonElement.classList.add("is-primary");
    doneButtonElement.classList.add("add-button");
    doneButtonElement.classList.add("fas");
    doneButtonElement.classList.add("fa-check");


    let deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add("button");
    deleteButtonElement.classList.add("is-danger");
    deleteButtonElement.classList.add("add-button");
    deleteButtonElement.classList.add("fas");
    deleteButtonElement.classList.add("fa-trash-alt");

    let jokeTextElement = document.createElement('p');
    jokeTextElement.innerText = jokeObject.joke;

    jokeElementParent.appendChild(jokeElement);
    jokeLineElement.appendChild(doneButtonElement);
    jokeLineElement.appendChild(deleteButtonElement);
    jokeLineElement.appendChild(jokeTextElement);

    let line = document.createElement('hr');
    jokeElement.appendChild(line);

    doneButtonElement.addEventListener ("click", function() {
      doneButtonElement.parentElement.lastElementChild.classList.add("joke-told");
      index = jokes.findIndex(j => j.joke === jokeObject.joke && j.index === jokeObject.index);
      jokes[index].done = true;
      localStorage.setItem(storageName, JSON.stringify(jokes));
    });

    if(jokeObject.done)
      doneButtonElement.parentElement.lastElementChild.classList.add("joke-told");

    deleteButtonElement.addEventListener ("click", function() {
      index = jokes.findIndex(j => j.joke === jokeObject.joke && j.index === jokeObject.index);
      jokes.splice(index, 1);
      localStorage.setItem(storageName, JSON.stringify(jokes));

      if(jokes.length <= 0)
        noJokeText.classList.remove('is-hidden');

      deleteButtonElement.parentElement.parentElement.remove();
    });

    jokesContainer.appendChild(jokeElement);
  }