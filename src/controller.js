import Model from './model.js';
import CatView from './views/catView.js';
import LoaderView from './views/loaderView.js';
import FavsView from './views/favsView.js';
import NameView from './views/nameView.js';
import SearchView from './views/SearchView.js';

const clearDataBtn = document.querySelector('.btn-clear-data');

let currentCat = await Model.getCat();
let preloadedNextCat = await Model.getCat();
let searchTimeout = undefined;

function init() {
    newCat();

    clearDataBtn.addEventListener('click', function () {
        clearData();
    });

    const favs = Model.getFavs();

    if (favs.length > 0) {
        SearchView.show();
        FavsView.maximize();
        FavsView.setTitle('✨ Your Favorite Cats 😍');
    } else {
        SearchView.hide();
        FavsView.minimize();
        FavsView.setTitle("💢 You've got no Favorite Cats 😕");
    }

    FavsView.loadFavs(favs);
}

function clearData() {
    Model.getFavs().forEach(function (cat) {
        FavsView.remove(cat.id);
    });

    FavsView.minimize();
    FavsView.setTitle("💢 You've got no Favorite Cats 😕");

    Model.clearData();
}

function filterCatSearch() {
    const text = SearchView.getText();

    if (searchTimeout != undefined) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(function () {
        const filteredCats = Model.getFavsByName(text);

        if (!filteredCats.length) {
            SearchView.showNoResults();
        } else {
            SearchView.hideNoResults();
        }

        FavsView.loadFavs(filteredCats);

        clearTimeout(searchTimeout);
        searchTimeout = undefined;
    }, 850);
}

function newCat() {
    NameView.hide();
    LoaderView.start();

    setTimeout(function () {
        CatView.displayCat(currentCat);
        Model.getCat().then(function (cat) {
            preloadedNextCat = cat;
        });
    }, 100);
}

SearchView.onInput(function () {
    filterCatSearch();
});

FavsView.onRemove(function (id) {
    FavsView.fadeOut(id);
    FavsView.remove(id);
    Model.removeFav(id);

    if (!SearchView.isEmpty()) {
        SearchView.clear();
        filterCatSearch();
    }

    if (Model.getFavs().length < 1) {
        setTimeout(function () {
            SearchView.hide();
            FavsView.minimize(id);
            FavsView.setTitle("💢 You've got no Favorite Cats 😕");
        }, 200);
    }
});

CatView.onLike(function () {
    if (NameView.isEmpty()) {
        NameView.shake();
        return;
    }

    SearchView.hideNoResults();
    SearchView.clear();
    SearchView.show();
    FavsView.maximize();
    FavsView.setTitle('✨ Your Favorite Cats 😍');
    LoaderView.setLike();
    currentCat.name = NameView.getText();
    NameView.clear();
    Model.likeCat(currentCat);
    FavsView.loadFavs(Model.getFavs());
    newCat();
    currentCat = preloadedNextCat;
});

CatView.onDislike(function () {
    SearchView.hideNoResults();
    SearchView.clear();
    LoaderView.setDislike();
    Model.dislikeCat(currentCat);
    newCat();
    currentCat = preloadedNextCat;
});

init();
