class SearchView {
    _element = document.querySelector('.cat-search');
    _noResultsText = document.querySelector('.cat-no-results');

    getText() {
        return this._element.value;
    }

    showNoResults() {
        this._noResultsText.classList.remove('hide');
    }

    hideNoResults() {
        this._noResultsText.classList.add('hide');
    }

    clear() {
        this._element.value = '';
    }

    onInput(fn) {
        this._element.addEventListener('input', function () {
            fn();
        });
    }

    isEmpty() {
        return this._element.value == '' || this._element.value == ' ';
    }

    show() {
        this._element.classList.remove('hide');
    }

    hide() {
        this._element.classList.add('hide');
    }
}

export default new SearchView();
