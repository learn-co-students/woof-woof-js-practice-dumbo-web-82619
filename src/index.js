// NEEDS REFACTORING, but, hey, it works, and I'm learning... \\



// SELECTION VARIABLES \\

const pupBar = document.querySelector('#dog-bar')
const pupInfo = document.querySelector('#dog-info')
const filterButton = document.querySelector('#good-dog-filter')



// FETCHES \\

pupFetch()


function pupFetch() {
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pupsArray => {
    pupsArray.forEach(addPupToPupBar)
  })
}


function goodPupFetch(){
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pupsArray => {
    pupsArray.filter(pup => pup.isGoodDog).forEach(addPupToPupBar)
  })
}



// HELPER METHODS \\

function addPupToPupBar(pup) {
  let pupSpan = document.createElement('span')
    pupSpan.innerText = pup.name
    pupSpan.addEventListener('click', (event) => {
      createPup(pup)
    })
    pupBar.append(pupSpan)
}


function createPup(pup) {
  removeChildren(pupInfo)
  let pupName = document.createElement('h2')
    pupName.innerText = pup.name
  let pupImg = document.createElement('img')
    pupImg.src = pup.image
    pupImg.alt = 'Puppy'
  let pupGoodOrBad = document.createElement('button')
    pupGoodOrBad.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
  let br = document.createElement('br')
  pupGoodOrBad.addEventListener('click', (event) => {
    togglePupGoodBad(pup)
  })
  pupInfo.append(pupName, pupImg, br, pupGoodOrBad)
}


function removeChildren(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}


function togglePupGoodBad(pup) {
  let pupGoodBad = pup.isGoodDog === true ? false : true
  fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: pupGoodBad
    }),
  })
  .then(response => response.json())
  .then(pupdated => {
    createPup(pupdated)
    togglePupBar()
  })
}


function togglePupBar() {
  if (filterButton.innerText === 'Filter good dogs: ON') {
    removeChildren(pupBar)
    goodPupFetch()
  } else {
    removeChildren(pupBar)
    pupFetch()
  }
}



// EVENT LISTENERS \\

filterButton.addEventListener('click', (event) => {
  if (filterButton.innerText === 'Filter good dogs: OFF') {
    filterButton.innerText = 'Filter good dogs: ON'
    removeChildren(pupBar)
    goodPupFetch()
  } else {
    filterButton.innerText = 'Filter good dogs: OFF'
    removeChildren(pupBar)
    pupFetch()
  }
})