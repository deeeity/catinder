class FavsView {
    _element = document.querySelector('.cat-favs');
    _holder = document.querySelector('.cat-favs-wrapper');
    _wrapper = document.querySelector('.cat-favs-view');
    _title = this._holder.querySelector('h1');
    _noCatImg = document.querySelector('.no-cat-wrapper');
    _onRemove = undefined;

    setTitle(txt) {
        this._title.innerHTML = txt;
    }

    loadFavs(favs) {
        this._element.innerHTML = '';

        for (const f of favs) {
            this._element.insertAdjacentHTML(
                'beforeend',
                `
            <div class="cat-fav fadeIn" id="${f.id}">
                <div></div>
                <p>${f.name}</p>
                <a>I've found another...</a>
            </div>
            `
            );

            const _this = this;
            document
                .getElementById(f.id)
                .querySelector('div').style.backgroundImage = `url("${f.url}")`;

            document
                .getElementById(f.id)
                .querySelector('a')
                .addEventListener('click', function () {
                    _this._onRemove(f.id);
                });

            setTimeout(function () {
                document.getElementById(f.id).classList.remove('fadeIn');
            }, 200);
        }
    }

    fadeOut(id) {
        document.getElementById(id).classList.add('fadeOut');
    }

    minimize() {
        this._holder.style.minHeight = '15vh';
        this._holder.style.maxHeight = '15vh';
        this._noCatImg.style.display = 'flex';
    }

    maximize() {
        this._holder.style.minHeight = '80vh';
        this._holder.style.maxHeight = '80vh';
        this._noCatImg.style.display = 'none';
    }

    remove(id) {
        this.fadeOut(id);
        setTimeout(function () {
            document.getElementById(id).remove();
        }, 200);
    }

    onRemove(fn) {
        this._onRemove = fn;
    }
}

export default new FavsView();
