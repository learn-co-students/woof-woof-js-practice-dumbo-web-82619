const dogDiv = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const filterBtn = document.querySelector("#good-dog-filter")

allDogs()

function showFirst(){
    fetch("http://localhost:3000/pups/1")
    .then(r => r.json())
    .then(dog => getDog(dog))
}

function allDogs(){
    fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(dogs => {
        dogs.forEach(dog => {
            displayDog(dog)
            showFirst()
        })
    })
}

function displayDog(dog){
    const name = dog.name

    const spanEl = document.createElement("span")
        spanEl.id = dog.id
        spanEl.textContent = name
        spanEl.addEventListener("click", evt => {
            fetch(`http://localhost:3000/pups/${dog.id}`)
            .then(r => r.json())
            .then(dog => {
                getDog(dog)
            })
        })
    dogDiv.append(spanEl)
}

function getDog(dog){
    dogInfo.innerHTML = ""

    const name = dog.name
    const goodDog = dog.isGoodDog
    const img = dog.image

    const imgEl = document.createElement("img")
        imgEl.src = img
    const h2El = document.createElement("h2")
        h2El.textContent = name
    const btnEl = document.createElement("button")
        btnEl.dataset.id = dog.id
        if (goodDog) btnEl.textContent = "Good Dog!"
        else btnEl.textContent = "Bad Dog!"
        btnEl.addEventListener("click", evt => {
            evt.preventDefault()
            toggleBtn(dog, btnEl)
        })
    dogInfo.append(imgEl, h2El, btnEl)
}

function toggleBtn(dog, btnEl){
    dog.isGoodDog = !dog.isGoodDog
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dog.isGoodDog
        })
    })
    .then(r => r.json())
    .then(dog => {
        if (dog.isGoodDog) btnEl.textContent = "Good Dog!"
        else btnEl.textContent = "Bad Dog!"
    })
}

filterBtn.addEventListener("click", evt => {
    dogDiv.innerHTML = ""
    if (filterBtn.textContent.includes("OFF")){
        filterBtn.textContent = "Filter good dogs: ON"
        fetch("http://localhost:3000/pups")
        .then(r => r.json())
        .then(dogs => {
            dogs.forEach(dog => {
                if (dog.isGoodDog){
                    displayDog(dog)
                }
            })
        })
    }
    else {
        filterBtn.textContent = "Filter good dogs: OFF"
        allDogs()
    }
})