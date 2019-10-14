let dogBar = document.querySelector("#dog-bar")
let jsonify = (res) => res.json()
fetch("http://localhost:3000/pups")
    .then(jsonify)
    .then((dogList) => {
        dogList.forEach((dog) => {
            dogBar.innerHTML += `<span data-id=${dog.id}>${dog.name}</span>`
        })
    })

let dogInfo = document.querySelector("#dog-info")

dogBar.addEventListener("click", (evt) => {
    evt.preventDefault()
    
    let dogId = evt.target.dataset.id
    
    fetch(`http://localhost:3000/pups/${dogId}`)
        .then(jsonify)
        .then((dogObj) => {
            dogInfo.innerHTML = ` <img src=${dogObj.image}>
                <h2 >${dogObj.name}</h2>
                <button id="dog-button">${dogObj.isGoodDog ? "true" : "false"}</button>`
            
            let dogButton = document.querySelector("#dog-button")
            dogButton.addEventListener("click", (evt) => {
                evt.preventDefault()
                
                fetch(`http://localhost:3000/pups/${dogId}`, {
                    method: "PATCH",
                    headers: {
                        "content-type" : "application/json",
                        "accept" : "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: !dogObj.isGoodDog////
                    })
                })
                .then(jsonify)
                .then((dogObj) => {
                  dogButton.innerText = dogObj.isGoodDog
                })
                
            })
        })
})

//EXTRA



