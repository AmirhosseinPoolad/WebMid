function onsubmit(event) {
    event.preventDefault()
    var form = document.getElementById("submit-form")
    var formData = Object.fromEntries(new FormData(form));
    var query = new URLSearchParams({ name: formData.name })
    fetch("https://api.genderize.io/?" + query, { method: 'get' })
        .then((resp) => resp.json())
        .then(
            (data) =>
            (
                changeDOM(formData.name, data.probability, data.gender)
            )
        );
}

function changeDOM(name, probability, gender){
    document.getElementById("pred-box").innerHTML = gender + "<br/>" + probability
    document.getElementById("saved-box").innerHTML = getSaved(name).name
}

function getSaved(name) {
    return { name: localStorage.getItem(name) }
}

function saveClick(event) {
    event.preventDefault()
    event.stopPropagation()
    var form = document.getElementById("submit-form")
    var formData = Object.fromEntries(new FormData(form));
    console.log(formData.gender)
    localStorage.setItem(formData.name, formData.gender);
}

function clearClick(event) {
    event.preventDefault()
    event.stopPropagation()
    var form = document.getElementById("submit-form")
    var formData = Object.fromEntries(new FormData(form));
    localStorage.removeItem(formData.name)
}

document.getElementById("submit-form")
    .addEventListener("submit", onsubmit);

document.getElementById("save-button")
    .addEventListener("click", saveClick);

document.getElementById("clear-button")
    .addEventListener("click", clearClick);