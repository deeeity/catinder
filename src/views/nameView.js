class NameView {
    _element = document.querySelector('.name-input');

    getText() {
        return this._element.value;
    }

    isEmpty() {
        return this._element.value == '' || this._element.value == ' ';
    }

    clear() {
        this._element.value = '';
    }

    shake() {
        this._element.classList.add('shake');
        const _this = this;
        setTimeout(function () {
            _this._element.classList.remove('shake');
        }, 500);
    }
}

export default new NameView();
