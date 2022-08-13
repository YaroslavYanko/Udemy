import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationVIew from "./views/PaginationVIew";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

if (model.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    //1. Получаєм hash сторінки
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

  resultsView.update(model.getSearchResultsPage())


    //2. Загрузка рецепта через fetch
    await model.loadRecipe(id);

    //3. Передаєм рецепт до класу
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controleSearchResults = async function () {
  try {
    const query = searchView.getQuery();

    if (!query) return;
    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    //Render pagination btn
    paginationVIew.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlePagination = function (goToPage) {
  //1. Рендерим нові рецепти пагінації
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2. Рендерим нові кнопки пагінації
  paginationVIew.render(model.state.search);
};

const controleServinsg = function (newServings) {
  //1. Оновити рецепт в state
  model.updateServings(newServings);

  //2. Оновити  рецепт в View
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controleServinsg)
  searchView.addHandlerSearch(controleSearchResults);
  paginationVIew.addHandlerClick(controlePagination);
};
init();
