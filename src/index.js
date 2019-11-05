const dogBar = document.querySelector('#dog-bar')

console.log(dogBar);


fetch('http://localhost:3000/pups')
.then(r => r.json())
.then(dogArr => {
    
    // debugger
    
    dogArr.forEach(dog => {
        
        //create element
        let newDog = document.createElement('span')
        //  razzz
        newDog.innerText = dog.name 
        newDog.dataset.id = dog.id
        //append
        dogBar.append(newDog)
        
    newDog.addEventListener('click', (e) => {

        // fetch(`http://localhost:3000/pups/${dog.id}`)
      const dogInfo = document.querySelector('#dog-info')
      dogInfo.innerHTML = ""
        // console.log(e.target)
            // create element
        // debugger
        let dogImg = document.createElement('img')
        let dogH2 = document.createElement('h2')
        let dogButton = document.createElement('button')
        // razz
        dogImg.src = dog.image
        dogH2.innerText = dog.name
        dogButton.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
        dogButton.dataset.id = dog.id

        //append to DOM
        dogInfo.append(dogImg, dogH2, dogButton )

        
        dogInfo.addEventListener('click', (e) => {
            let newValue;
            if (e.target.innerText.includes("Good")){
              e.target.innerText = "Bad Dog"
              newValue = false
            } else {
              e.target.innerText = "Good Dog"
              newValue = true
            }
            toggleGoodDog(e.target.dataset.id, newValue)
        })
    
        function toggleGoodDog(id, newValue){
            const options = {
              method: "PATCH",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({
                isGoodDog: newValue
              })
            }
            return fetch(`http://localhost:3000/pups/${dog.id}`, options)
              .then(r => r.json())
              
          }
    

    
    })

    

 })

    console.log(dogArr);
    
})