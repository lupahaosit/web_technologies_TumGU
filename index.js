function drawCatalogItem(id, name, price, imagePath) {
    var catalogDiv = document.getElementById('catalog-id')
    var element = document.createElement('div');
    element.classList = 'd-flex col-4'
    element.innerHTML = `<div id =${id} class = "d-flex flex-column align-items-center"><a href="itemPage.php?id=${id}">
        <img src="${imagePath}" class = "catalog-image ">
            <p>${name}</p>
            <p>${price}</p>
    </a></div>`

    catalogDiv.appendChild(element)
}

function getCatalogItem(name, price, imagePath, description){
    var catalogDiv = document.getElementById('item-info-page')
    var element = document.createElement('div');
    element.classList = 'd-flex justify-content-around'
    element.innerHTML = `<div class = "d-flex flex-column align-items-center">
        <img src="${imagePath}" class = "" alt="$">
            <p>${name}</p>
            <p>${price}</p>
            <p>${description}</p>
            </div>`

    catalogDiv.appendChild(element)
}

function addItemReview(){
    var reviewInput = document.getElementById('review-input').value
    var nameInput = document.getElementById('name-input').value
    drawItemReview(reviewInput, nameInput)

    
}

function drawItemReview(review, name){
    var reviewsDiv = document.getElementById('reviews-div')
    var element = document.createElement('div')
    element.classList = "border d-flex flex-column"
    element.innerHTML = `<p>${name}</p>
        <p>${review}</p>
    `
    reviewsDiv.appendChild(element)
}


document.getElementById("reviewForm").onsubmit = async (e) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');

    const name = e.target.reviewerNameInput.value;
    const text = e.target.reviewTextInput.value;

    const data = new URLSearchParams();
    data.append('reviewerNameInput', name);
    data.append('reviewTextInput', text);
    data.append('itemId', id)

    console.log('Sending:', { name, text });

    const response = await fetch("addReview.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
    });

    console.log('Response:', await response.text());
};