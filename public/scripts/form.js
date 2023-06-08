let container = document.getElementById('field-container');
let index = container.dataset.ingtotal;

document.getElementById('add-field').onclick = function () {
    let template = `
        <p>Ingredient ${+index+1}</p>
        <div class="name">
            <label for="name">Name</label>
            <input id="ingname-input" type="text" name="ingredient[${index}]name">
        </div>
        <div class="quantity">
            <label for="quantity">Quantity</label>
            <input id="quantity-input" type="number" name="ingredient[${index}]quantity" min="0">
        </div>
        <div class="unit">
            <label for="unit">Measurement unit</label>
            <input id="unit-input" type="text" name="ingredient[${index}]unit">
        </div>`;
    
    let newIngredient = document.createElement('div');
    newIngredient.innerHTML = template;
    newIngredient.setAttribute('class', 'ingredient');

    container.appendChild(newIngredient);
    index++;
    return false;
}