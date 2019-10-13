let dogBar = document.querySelector("#dog-bar")
let dogInfo = document.querySelector("#dog-info")
let filterButton = document.querySelector("#good-dog-filter")
let allDogsArr = []

/* STEP 2: ADD PUPS TO DOG BAR */
fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(dogsJSON => { 
    allDogsArr = dogsJSON
    dogBar.innerHTML = ""
    dogsJSON.forEach(dog => {
        addDogs(dog)
    }); 
})

function addDogs(dog) {
    let span = document.createElement("span")
        span.setAttribute("data-id", `${dog.id}`)
        span.innerHTML = `${dog.name}`
    dogBar.append(span)

    span.addEventListener("click", (evt) => {
        showInfo(dog)
        // debugger
    })
}


/* STEP 3: SHOW MORE INFO ABOUT EACH PUP */
function showInfo(dog) {
    fetch(`http://localhost:3000/pups/${dog.id}`)
    .then(res => res.json())
    .then( dogJson => {
        dogInfo.innerHTML = ""
        createShowInfo(dogJson)
    })
}
/* create each element to show on DOM */
function createShowInfo(dog) {
    let dogImg = document.createElement("img")
        dogImg.src = `${dog.image}`
    let dogH2 = document.createElement("h2")
        dogH2.innerText = `${dog.name}`
    let dogButton = document.createElement("button")
        dogButton.setAttribute("data-id", `${dog.id}`)
        dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    dogInfo.append(dogImg, dogH2, dogButton) 

    // let dogButtonBool = `${dog.isGoodDog}` before the eventListener. why not working??

    /* STEP 4: TOGGLE GOOD DOG */
    dogButton.addEventListener("click", (evt) => {
        let buttonLine = evt.target
        let id = evt.target.dataset.id

        if (buttonLine.innerText === "Good Dog!") {
            fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: false
                })
            })
            .then(res => res.json())
            .then(updatedJSON => {
                buttonLine.innerText = "Bad Dog!"
            })
        }
        else if (buttonLine.innerText === "Bad Dog!"){
            fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: true
                })
            })
            .then(res => res.json())
            .then(updatedJSON => {
                buttonLine.innerText = "Good Dog!"
                allDogsArr.push(updatedJSON)
            })
        }
    })
}


/* STEP 5: FILTER GOOD DOGS */
filterButton.addEventListener("click", (evt) => {
    evt.target.innerText = (evt.target.innerText === "Filter good dogs: OFF") ? "Filter good dogs: ON" : "Filter good dogs: OFF"
    if (evt.target.innerText === "Filter good dogs: ON") {
        filteredGoodDogs = allDogsArr.filter(dog => { return dog.isGoodDog === true}) 
        dogBar.innerHTML = ""
        filteredGoodDogs.forEach(addDogs)
    }
    else {
        // show all the dogs 
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(dogsJSON => { 
            allDogsArr = dogsJSON
            dogBar.innerHTML = ""
            dogsJSON.forEach(dog => {
                addDogs(dog)
            }); 
        })
    }
})