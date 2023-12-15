// offcanvos
document.addEventListener("DOMContentLoaded", function () {
  const openOffcanvasButton = document.getElementById("openOffcanvas");
  const offcanvas = document.getElementById("offcanvas");

  openOffcanvasButton.addEventListener("click", function () {
    offcanvas.style.right = offcanvas.style.right === "0" ? "-100%" : "0";
  });

  const closeOffcanvasButton = document.getElementById("closeOffcanvas");
  closeOffcanvasButton.addEventListener("click", function () {
    offcanvas.style.right = "-100%";
  });
});
// render recipes
// render recipes
const recipesContainer = document.getElementById("recipes-container");

fetch("./recipes.json")
  .then((response) => response.json())
  .then((data) => {
    const recipes = data.recipes;
    recipes.map((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");
      recipeCard.innerHTML = `
            <div class="food-img-container">
                <img src=${recipe.pictureUrl}>
            </div>
            <h1>${recipe.name}</h1>
            <button>Read More</button>
            `;
        recipesContainer.appendChild(recipeCard)
    });
  });
