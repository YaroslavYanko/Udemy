import icons from "../../img/icons.svg";
import View from "./View";

class PaginationVIew extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
  

      const goToPage = +btn.dataset.goto;
   
      handler(goToPage);
   
    });
  }

  _generateMarkup() {
    //this._data.page=1
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    //Перша сторінка
    if (curPage === 1 && numPages > 1) {
      return this.generateMarkupBtnNext(curPage);
    }
    //Остання сторінка
    if (curPage === numPages && numPages > 1) {
      return this.generateMarkupBtnPrev(curPage);
    }
    //По серед сторінок
    if (curPage < numPages) {
      return `${this.generateMarkupBtnPrev(
        curPage
      )} ${this.generateMarkupBtnNext(curPage)}`;
    }

    return "";
  }

  generateMarkupBtnPrev(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${curPage - 1}</span>
     </button>
        `;
  }

  generateMarkupBtnNext(curPage) {
    return `
    <button data-goto="${
      curPage + 1
    }"  class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
  }
}

export default new PaginationVIew();
