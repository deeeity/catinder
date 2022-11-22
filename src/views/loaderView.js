class LoaderView {
    _element = document.querySelector('.loading-screen');
    _text = this._element.querySelector('p');

    setDislike() {
        this._element.style.backgroundColor = 'rgb(255, 100, 100)';
        this.setText('That was not a nice one... 😨😧');
    }

    setText(txt) {
        this._text.innerHTML = txt;
    }

    setLike() {
        this._element.style.backgroundColor = 'rgb(100, 255, 100)';
        this.setText('Sexy cats in your area... 😍😋');
    }

    start() {
        this._element.style.opacity = '1';
    }

    stop() {
        this._element.style.opacity = '0';
    }
}

export default new LoaderView();
