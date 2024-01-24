
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"


let firebaseConfig = {
    databaseURL: "https://pulp-fiction-16776-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const moviesDB = ref(db, "movies")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
let moviesListEl = document.getElementById("movies-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    // push to firebase database
    push(moviesDB, inputValue)

    // clear the input field
    clearInputFieldEl()
})

onValue(moviesDB, function(snapshot){

    if(snapshot.exists()){
        const moviesListDB = snapshot.val()
        let moviesList = Object.entries(moviesListDB)
        // console.log(moviesList)
        
        // clear movies list
        clearMoviesListEl()
        
        for (let i = 0; i < moviesList.length; i++) {
            const currentMovie = moviesList[i];
            appendItemToMoviesListEl(currentMovie)
        }
    }else{
        moviesListEl.innerHTML = "<div class='no-items'>No movies to binge watch...yet</div>"
    }

})


function clearMoviesListEl() {
    moviesListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToMoviesListEl(item) {
    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDB = ref(db, `movies/${itemId}`)
        remove(exactLocationOfItemInDB)
    })

    newEl.textContent = itemValue
    moviesListEl.append(newEl)

}