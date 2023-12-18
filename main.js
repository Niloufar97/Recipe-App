document.addEventListener("DOMContentLoaded", function () {
  const openOffcanvasButton = document.getElementById("openOffcanvas");
  const offcanvas = document.getElementById("offcanvas");
  // popup--------------------------------------------------------------
  const popupTitle = document.querySelector(".popup-title");
  const popupImage = document.querySelector('.popup-image');
  const popupIngredientsUl = document.querySelector('.popup-ingredients-ul');
  const popupRecipeMethod = document.querySelector('.recipe-method');
  const cookingTime = document.querySelector('.cookingtime');
  const country = document.querySelector('.country');

  // offcanvos------------------------------------------------------------
  openOffcanvasButton.addEventListener("click", function () {
    offcanvas.style.right = offcanvas.style.right === "0" ? "-100%" : "0";
  });

  const closeOffcanvasButton = document.getElementById("closeOffcanvas");
  closeOffcanvasButton.addEventListener("click", function () {
    offcanvas.style.right = "-100%";
  });

  // smooth animation for header-------------------------------------------------
  const primaryNav = document.querySelector(".primary-nav");
  const headerBar = document.querySelector(".header-bar");
  const logo = document.querySelector(".logo");
  let lastScrollPosition = 0;

  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 0) {
      // Scrolling down
      primaryNav.style.transition = "height 0.3s";
      headerBar.style.transition = "height 0.3s";
      logo.style.transition = "font-size 0.3s";
      primaryNav.style.height = "10vh";
      headerBar.style.height = "0.5rem";
      headerBar.style.top = "10vh";
      logo.style.fontSize = "1.5rem";
    } else {
      // Scrolling up
      primaryNav.style.transition = "height 0.3s";
      headerBar.style.transition = "height 0.3s";
      logo.style.transition = "font-size 0.3s";
      primaryNav.style.height = "13vh";
      headerBar.style.height = "2rem";
      headerBar.style.top = "13vh";
      logo.style.fontSize = "2rem";
    }

    lastScrollPosition = currentScrollPosition;
  });

  const recipesContainer = document.getElementById("recipes-container");

  fetch("./recipes.json")
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;
      renderRecipes()

      // render function----------------------------------------------
      function renderRecipes() {
        recipes.map((recipe) => {
          const recipeCard = document.createElement("div");
          recipeCard.classList.add("recipe-card");
          recipeCard.innerHTML = `
          <div class="food-img-container">
              <img src=${recipe.pictureUrl}>
          </div>
          <h1 class="food-name">${recipe.name}</h1>
          <button class="read-more-btn">Read More</button>
          `;
          recipesContainer.appendChild(recipeCard);
          const openPopupButton = recipeCard.querySelector('.read-more-btn')
          openPopupButton.addEventListener('click' , ()=>{
            openPopup(recipe)
          })
        });
      }
      // popup ----------------------------------------------------
      function openPopup(recipe){
        popupTitle.textContent = recipe.name;
        popupImage.src = recipe.pictureUrl;
        recipe.ingredients.forEach(ingredient => {
          const popupIngrenientsLi = document.createElement('li');
          popupIngrenientsLi.innerText = ingredient;
          popupIngredientsUl.appendChild(popupIngrenientsLi);
          popupRecipeMethod.textContent = recipe.method;
          cookingTime.textContent = recipe.cookingTime;
          country.textContent = recipe.country;
        })
      }   
    });
});
