class CatView {
    _element = document.querySelector('.cat-preview');
    _like = document.querySelector('.yes');
    _dislike = document.querySelector('.no');

    displayCat(cat) {
        this._element.style.backgroundImage = `url("${cat.url}")`;
    }

    onLike(fn) {
        this._like.addEventListener('click', fn);
    }

    onDislike(fn) {
        this._dislike.addEventListener('click', fn);
    }
}

export default new CatView();
