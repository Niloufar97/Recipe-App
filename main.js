document.addEventListener("DOMContentLoaded", function () {

  const recipesContainer = document.getElementById("recipes-container");

  // offcanvas---------------------------------------------------------

  const openOffcanvasButton = document.getElementById("openOffcanvas");
  const offcanvas = document.getElementById("offcanvas");

  // popup--------------------------------------------------------------

  const popupContainer = document.getElementById('popup-container')
  const popupTitle = document.querySelector(".popup-title");
  const popupImage = document.querySelector('.popup-image');
  const popupIngredientsUl = document.querySelector('.popup-ingredients-ul');
  const popupRecipeMethod = document.querySelector('.recipe-method');
  const cookingTime = document.querySelector('.cookingtime');
  const country = document.querySelector('.country');
  const closePopupBtn = document.querySelector('.popup-close-btn')
  const overlay = document.getElementById('overlay')

  // add new recipe-----------------------------------------------------

  const addIngredientsButton = document.querySelector('.add-ingredient-button');
  const ingredientsContainer = document.getElementById('ingredients-container');
  const ingredientInputs = document.querySelectorAll('.ingredient');
 
  // add new recipe functionality---------------------------------------------
  // ADD Ingredients
  let ingredients = [];

  addIngredientsButton.addEventListener('click' , () => {
    const ingredientInput = document.createElement('input');
    ingredientInput.type = 'text';
    ingredientInput.classList.add('newIngredient')
    ingredientsContainer.appendChild(ingredientInput);
    ingredientInput.addEventListener('change' , () => {
      ingredients.push(ingredientInput.value);
      console.log(ingredients);
    })
  })
  
  ingredientInputs.forEach((ingredientInput) => {
    ingredientInput.addEventListener('change' , () => {
      ingredients.push(ingredientInput.value)
      console.log(ingredients);
    })
  })


  // filters-----------------------------------------------------------------

  const allRecipes = document.querySelector('.all-recipes');
  const chickenRecipes = document.querySelector('.chicken-recipes');
  const meatRecipes = document.querySelector('.meat-recipes');
  const seafoodRecipes = document.querySelector('.seafood-recipes');
  const vegetarianRecipes = document.querySelector('.vegetarian-recipes');

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



  fetch("./recipes.json")
    .then((response) => response.json())
    .then((data) => {
      const recipes = data.recipes;
      renderRecipes(recipes)

      // render function----------------------------------------------

      function renderRecipes(recipesToRender) {
        recipesToRender.map((recipe) => {
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
            overlay.style.display = "block"
            openPopup(recipe)
          })
        });
      }
      // FILTERS----------------------------------------------------
      // ALL
      allRecipes.addEventListener('click', () => {
        recipesContainer.textContent = ""
        renderRecipes(recipes);
      });

      // CHICKEN
      chickenRecipes.addEventListener('click', ()=>{
        recipesContainer.textContent = ""
        const chicken = recipes.filter(recipe => recipe.type === 'chicken');
        renderRecipes(chicken);
      });

      // MEAT
      meatRecipes.addEventListener('click' , () => {
        recipesContainer.textContent = ""
        const meat = recipes.filter(recipe => recipe.type === 'meat');
        renderRecipes(meat);
      });

      // SEAFOOD
      seafoodRecipes.addEventListener('click' , () => {
        recipesContainer.textContent = ""
        const seafood = recipes.filter(recipe => recipe.type === 'seafood');
        renderRecipes(seafood);
      });

      // VEGETARIAN
      vegetarianRecipes.addEventListener('click' , () => {
        recipesContainer.textContent = ""
        const vegetarian = recipes.filter(recipe => recipe.type === 'vegetarian');
        renderRecipes(vegetarian);
      });

      // POPUP ----------------------------------------------------
      function openPopup(recipe){
        popupIngredientsUl.textContent = ""
        popupContainer.style.display = "block"
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
      closePopupBtn.addEventListener('click' , ()=>{
        popupContainer.style.display = "none"
        overlay.style.display = "none"
      })
    });
});
