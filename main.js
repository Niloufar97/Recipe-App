document.addEventListener("DOMContentLoaded", function () {
  let idMaker;

  const recipesContainer = document.getElementById("recipes-container");

  // offcanvas---------------------------------------------------------

  const openOffcanvasButton = document.getElementById("openOffcanvas");
  const offcanvas = document.getElementById("offcanvas");
  const offcanvasAddNewRecipeLink = document.querySelector(
    ".offcanvas-add-new-recipe"
  );

  // popup--------------------------------------------------------------

  const popupContainer = document.getElementById("popup-container");
  const popupTitle = document.querySelector(".popup-title");
  const popupImage = document.querySelector(".popup-image");
  const popupIngredientsUl = document.querySelector(".popup-ingredients-ul");
  const popupRecipeMethod = document.querySelector(".recipe-method");
  const cookingTime = document.querySelector(".cookingtime");
  const country = document.querySelector(".country");
  const closePopupBtn = document.querySelector(".popup-close-btn");
  const overlay = document.getElementById("overlay");

  // add new recipe-----------------------------------------------------

  const addIngredientsButton = document.querySelector(".add-ingredient-button");
  const ingredientsContainer = document.getElementById("ingredients-container");
  const ingredientInputs = document.querySelectorAll(".ingredient");
  const newFoodName = document.getElementById("food-name");
  const newFoodCountry = document.getElementById("add-food-country");
  const newRecipeMethod = document.getElementById("add-recipe-method");
  const addRecipeButton = document.querySelector(".add-recipe-button");
  const newFoodImg = document.getElementById("add-food-img");
  const newCookingTime = document.getElementById("add-cooking-time");
  const addRecipeForm = document.getElementById("add-new-recipe-form");

  // filters-----------------------------------------------------------------

  const allRecipesLi = document.querySelectorAll(".all-recipes");
  const chickenRecipesLi = document.querySelectorAll(".chicken-recipes");
  const meatRecipesLi = document.querySelectorAll(".meat-recipes");
  const seafoodRecipesLi = document.querySelectorAll(".seafood-recipes");
  const vegetarianRecipesLi = document.querySelectorAll(".vegetarian-recipes");

  // SEARCH----------------------------------------------------------

  const searchInputs = document.querySelectorAll(".search-input");
  const searchButtons = document.querySelectorAll(".search-btn");

  // offcanvos------------------------------------------------------------

  openOffcanvasButton.addEventListener("click", function () {
    offcanvas.style.right = offcanvas.style.right === "0" ? "-100%" : "0";
  });

  const closeOffcanvas = () => {
    offcanvas.style.right = "-100%";
  };
  const closeOffcanvasButton = document.getElementById("closeOffcanvas");
  closeOffcanvasButton.addEventListener("click", closeOffcanvas);

  // close offcanvose when click on add new recipe link

  offcanvasAddNewRecipeLink.addEventListener("click", closeOffcanvas);

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

  // FETCH DATA----------------------------------------

  axios.get("http://localhost:3000/recipes").then((response) => {
    const recipes = response.data;
    renderRecipes(recipes);

    // GET ID FOR DELETE DATA
    const recipeIds = recipes.map((recipe) => recipe.id);
    recipeIds.sort((a, b) => b - a);
    idMaker = recipeIds[0] + 1;

    // OPEN POPUP FUNCTION ----------------------------------------------------
    function openPopup(recipe) {
      popupIngredientsUl.textContent = "";
      popupContainer.style.display = "block";
      popupTitle.textContent = recipe.name;
      popupImage.src = recipe.pictureUrl;
      recipe.ingredients.forEach((ingredient) => {
        const popupIngrenientsLi = document.createElement("li");
        popupIngrenientsLi.innerText = ingredient;
        popupIngredientsUl.appendChild(popupIngrenientsLi);
        popupRecipeMethod.textContent = recipe.method;
        cookingTime.textContent = recipe.cookingTime;
        country.textContent = recipe.country;
      });
    }
    closePopupBtn.addEventListener("click", () => {
      popupContainer.style.display = "none";
      overlay.style.display = "none";
    });

    // RENDER RECIPES FUNCTION----------------------------------------------

    function renderRecipes(recipesToRender) {
      recipesToRender.map((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.id = recipe.id;
        recipeCard.innerHTML = `
            <div class="food-img-container">
                <img src=${recipe.pictureUrl}>
            </div>
            <h2 class="food-name">${recipe.name}</h2>
            <div class="card-buttons">
              <button class="read-more-btn">Read More</button>
              <button class="delete-btn">Delete</button>
            </div>
            `;
        recipesContainer.appendChild(recipeCard);
        // OPEN POPUP
        const openPopupButton = recipeCard.querySelector(".read-more-btn");
        openPopupButton.addEventListener("click", () => {
          overlay.style.display = "block";
          openPopup(recipe);
        });

        // DELETE RECIPE
        const deleteRecipeButton = recipeCard.querySelector(".delete-btn");
        deleteRecipeButton.addEventListener("click", (e) => {
          let target = e.target;
          while (target && !target.classList.contains("recipe-card")) {
            target = target.parentNode;
          }
          const dataId = target.id;
          console.log(dataId);
          axios.delete(`http://localhost:3000/recipes/${dataId}`);
        });
      });
    }

    // FILTERS----------------------------------------------------
    // ALL
    allRecipesLi.forEach((allRecipes) => {
      allRecipes.addEventListener("click", () => {
        recipesContainer.textContent = "";
        renderRecipes(recipes);
        closeOffcanvas();
      });
    });

    // CHICKEN
    chickenRecipesLi.forEach((chickenRecipes) => {
      chickenRecipes.addEventListener("click", () => {
        recipesContainer.textContent = "";
        const chicken = recipes.filter((recipe) => recipe.type === "chicken");
        renderRecipes(chicken);
        closeOffcanvas();
      });
    });

    // MEAT
    meatRecipesLi.forEach((meatRecipes) => {
      meatRecipes.addEventListener("click", () => {
        recipesContainer.textContent = "";
        const meat = recipes.filter((recipe) => recipe.type === "meat");
        renderRecipes(meat);
        closeOffcanvas();
      });
    });

    // SEAFOOD
    seafoodRecipesLi.forEach((seafoodRecipes) => {
      seafoodRecipes.addEventListener("click", () => {
        recipesContainer.textContent = "";
        const seafood = recipes.filter((recipe) => recipe.type === "seafood");
        renderRecipes(seafood);
        closeOffcanvas();
      });
    });

    // VEGETARIAN
    vegetarianRecipesLi.forEach((vegetarianRecipes) => {
      vegetarianRecipes.addEventListener("click", () => {
        recipesContainer.textContent = "";
        const vegetarian = recipes.filter(
          (recipe) => recipe.type === "vegetarian"
        );
        renderRecipes(vegetarian);
        closeOffcanvas();
      });
    });

    // SEARCH------------------------------------------------------------------
    let searchWord = "";
    // save value of the search input
    searchInputs.forEach((searchInput) => {
      searchInput.addEventListener("change", () => {
        const inputValue = searchInput.value;
        searchWord = inputValue.toLowerCase();
      });
    });
    // event listener for search buttons
    searchButtons.forEach((searchButton) => {
      searchButton.addEventListener("click", () => {
        const searchedRecipes = recipes.filter((recipe) => {
          const lowerCaseName = recipe.name.toLowerCase();
          const LowerCaseCountry = recipe.country.toLowerCase();
          const lowerCaseIngredints = recipe.ingredients.map((ingredient) =>
            ingredient.toLowerCase()
          );
          const isSearchWordInIngredients = lowerCaseIngredints.some(
            (ingredient) => ingredient.includes(searchWord)
          );
          return (
            lowerCaseName.includes(searchWord) ||
            LowerCaseCountry.includes(searchWord) ||
            isSearchWordInIngredients
          );
        });
        recipesContainer.textContent = "";
        searchedRecipes.length === 0
          ? (recipesContainer.innerHTML = `<h2>Recipe Not Found</h2>`)
          : renderRecipes(searchedRecipes);
        closeOffcanvas();
      });
    });

    // ADD NEW RECIPE---------------------------------------------
    // Add Ingredients
    let ingredients = [];

    addIngredientsButton.addEventListener("click", () => {
      const ingredientInput = document.createElement("input");
      ingredientInput.type = "text";
      ingredientInput.classList.add("newIngredient");
      ingredientsContainer.appendChild(ingredientInput);
      ingredientInput.addEventListener("change", () => {
        ingredients.push(ingredientInput.value);
      });
    });

    ingredientInputs.forEach((ingredientInput) => {
      ingredientInput.addEventListener("change", () => {
        ingredients.push(ingredientInput.value);
      });
    });

    //EventListener for add new recipe button
    addRecipeButton.addEventListener("click", () => {
      let foodImage = newFoodImg.value;
      if (!foodImage) {
        foodImage =
          "https://i.pinimg.com/736x/de/0a/ed/de0aedebc6d17dc16a269a13921f5492.jpg";
      }

      const newRecipe = {
        id: idMaker,
        name: newFoodName.value,
        country: newFoodCountry.value,
        ingredients: ingredients,
        method: newRecipeMethod.value,
        pictureUrl: foodImage,
        cookingTime: newCookingTime.value,
        type: "",
      };
      console.log(idMaker);
      // addNewRecipeToContainer(newRecipe);
      axios.post("http://localhost:3000/recipes", newRecipe);
      addRecipeForm.reset();
      ingredients = [];
    });
  });
});
