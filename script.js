const form = document.getElementById('recipeForm');
const recipesContainer = document.getElementById('recipesContainer');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalIngredients = document.getElementById('modalIngredients');
const modalSteps = document.getElementById('modalSteps');

// Load recipes from localStorage
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function displayRecipes(filtered = recipes) {
  recipesContainer.innerHTML = '';
  filtered.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="Recipe">
      <h3>${recipe.name}</h3>
    `;
    card.addEventListener('click', () => showModal(recipe));
    recipesContainer.appendChild(card);
  });
}

  function toggleMenu() {
    const navLinks = document.querySelector('.navbar-links');
    navLinks.classList.toggle('active');
  }

function showModal(recipe) {
  modalTitle.textContent = recipe.name;
  modalImage.src = recipe.image;
  modalIngredients.textContent = recipe.ingredients;
  modalSteps.textContent = recipe.steps;
  modal.style.display = 'flex';
}

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const ingredients = document.getElementById('ingredients').value.trim();
  const steps = document.getElementById('steps').value.trim();
  const imageInput = document.getElementById('image');
  
  if (!name || !ingredients || !steps || !imageInput.files[0]) {
    alert("Please fill in all fields.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;

    const newRecipe = { name, ingredients, steps, image };
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
    form.reset();
  };
  reader.readAsDataURL(imageInput.files[0]);
});

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.ingredients.toLowerCase().includes(query)
  );
  displayRecipes(filtered);
});

// Initial display
displayRecipes();

// 🔁 Footer search triggers top search bar
function scrollToTopAndFocus() {
  const footerInput = document.getElementById("footerSearchInput");
  const topSearch = document.getElementById("searchInput");

  if (footerInput && topSearch) {
    const query = footerInput.value.trim();
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      topSearch.value = query;
      topSearch.dispatchEvent(new Event("input")); // trigger live search
      topSearch.focus();
    }, 400); // enough time for smooth scroll
  }
}
