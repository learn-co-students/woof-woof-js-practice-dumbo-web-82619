const dogBar = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')
let filter = document.querySelector('#good-dog-filter')


function addPuppyData(obj){
    let puppyName = document.createElement('span')
    puppyName.className = `${obj.isGoodDog ? 'Good' : 'Bad'}`
    puppyName.innerText = obj.name 
    puppyName.dataset.id = `${obj.id}`
    puppyName.addEventListener('click', evt => {
        let puppyImage = document.createElement('img')
        puppyImage.id = 'puppy-image'
        puppyImage.src = obj.image
        
        let pupName = document.createElement('h2')
        pupName.id = 'puppy-name'
        pupName.innerText = obj.name

        let button = document.createElement('button')
        button.id = 'puppy-button'
        button.innerText = obj.isGoodDog ? "Good Dog!" : "Bad Dog!"
        button.addEventListener('click', evt => {
            fetch(`http://localhost:3000/pups/${obj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: obj.isGoodDog ? false : true
                })
            })
            .then(resp => resp.json())
            .then(respJSON => {
                button.innerText = respJSON.isGoodDog ? "Good Dog!" : "Bad Dog!"  
                obj = respJSON
                puppyName.className = `${obj.isGoodDog ? 'Good' : 'Bad'}`
                let selectedPup = document.querySelector(`[data-id="${obj.id}"]`)
                if (filter.innerText === 'Filter good dogs: ON'){
                    if (puppyName.className === 'Good'){
                        if (!dogBar.contains(selectedPup)){
                            dogBar.append(puppyName)
                        }
                    }
                    else {
                        selectedPup.parentNode.removeChild(selectedPup)
                    }
                }
            })
        })

        if (dogInfo.childElementCount < 1){
            dogInfo.append(puppyImage, pupName, button)
        }
        else {
            let oldImage = document.querySelector('#puppy-image')
            let oldName = document.querySelector('#puppy-name')
            let oldButton = document.querySelector('#puppy-button')

            dogInfo.replaceChild(puppyImage, oldImage)
            dogInfo.replaceChild(pupName, oldName)
            dogInfo.replaceChild(button, oldButton)
        }
    })
    dogBar.append(puppyName)
}

fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(respJSON => respJSON.forEach(addPuppyData))

filter.addEventListener('click', evt => {
    if (filter.innerText === 'Filter good dogs: OFF'){
        filter.innerText = 'Filter good dogs: ON'
        dogBar.innerHTML = ''
        fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(respJSON => respJSON.forEach(respJSON => {
            if (respJSON.isGoodDog){
                    addPuppyData(respJSON)
                }
            }))
    }
    else {
        filter.innerText = 'Filter good dogs: OFF'
        dogBar.innerHTML = ''
        fetch('http://localhost:3000/pups')
            .then(resp => resp.json())
            .then(respJSON => respJSON.forEach(addPuppyData))
    }
})