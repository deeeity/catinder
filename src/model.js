import Cat from './classes/cat.js';

class Model {
    _apiLink = 'https://api.thecatapi.com/v1/images/search';
    _dislikedCats = JSON.parse(localStorage.getItem('dislikedCats')) || [];
    _likedCats = JSON.parse(localStorage.getItem('likedCats')) || [];

    async getCat() {
        const res = await fetch(this._apiLink);
        const data = await res.json();

        const cat = new Cat(data[0]);

        if (this.isDisliked(cat)) {
            this.getCat();
        } else {
            return cat;
        }
    }

    removeFav(id) {
        const found = this._likedCats.find((element) => element.id == id);
        const index = this._likedCats.indexOf(found);

        this._likedCats.splice(index, 1);
        localStorage.setItem('likedCats', JSON.stringify(this._likedCats));
    }

    getFavs() {
        return this._likedCats;
    }

    getFavsByName(name) {
        const match = new RegExp(name, 'gi');
        return this._likedCats.filter(function (cat) {
            return String(cat.name).match(match);
        });
    }

    likeCat(cat) {
        if (this._likedCats.includes(cat)) return;
        this._likedCats.push(cat);
        localStorage.setItem('likedCats', JSON.stringify(this._likedCats));
    }

    dislikeCat(cat) {
        if (this._dislikedCats.includes(cat)) return;
        this._dislikedCats.push(cat);
        localStorage.setItem(
            'dislikedCats',
            JSON.stringify(this._dislikedCats)
        );
    }

    clearData() {
        this._dislikedCats = [];
        this._likedCats = [];
        localStorage.setItem('likedCats', JSON.stringify(this._likedCats));
        localStorage.setItem(
            'dislikedCats',
            JSON.stringify(this._dislikedCats)
        );
    }

    isDisliked(cat) {
        return this._dislikedCats.includes(cat);
    }
}

export default new Model();
