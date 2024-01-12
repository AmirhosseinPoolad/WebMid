//run when submit button pressed
function onsubmit(event) {
    //avoid default form submit function
    event.preventDefault()
    //get data from form
    var form = document.getElementById("submit-form")
    var formData = Object.fromEntries(new FormData(form));
    var query = new URLSearchParams({ name: formData.name })
    //request from api and change DOM accordingly
    fetch("https://api.genderize.io/?" + query, { method: 'get' })
        .then((resp) => resp.json())
        .then(
            (data) =>
            (
                changeDOM(formData.name, data.probability, data.gender)
            )
        );
}

//changes the dom
function changeDOM(name, probability, gender){
    document.getElementById("pred-box").innerHTML = gender + "<br/>" + probability
    document.getElementById("saved-box").innerHTML = getSaved(name).name
}

//gets gender saved in localStorage
function getSaved(name) {
    return { name: localStorage.getItem(name) }
}

//run when save button pressed
function saveClick(event) {
    //stop default button handling and propogation to parent
    event.preventDefault()
    event.stopPropagation()
    //get name and gender from form and save in localStorage
    var form = document.getElementById("submit-form")
    var formData = Object.fromEntries(new FormData(form));
    console.log(formData.gender)
    localStorage.setItem(formData.name, formData.gender);
}

//run when clear button pressed
function clearClick(event) {
    //stop default button handling and propogation to parent
    event.preventDefault()
    event.stopPropagation()
    //get name from form and remove from localStorage
    var form = document.getElementById("submit-form")
    var formData = Object.fromEntries(new FormData(form));
    localStorage.removeItem(formData.name)
}

//bind functions to buttons
document.getElementById("submit-form")
    .addEventListener("submit", onsubmit);

document.getElementById("save-button")
    .addEventListener("click", saveClick);

document.getElementById("clear-button")
    .addEventListener("click", clearClick);