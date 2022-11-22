import LoaderView from '../views/loaderView.js';
import NameView from '../views/nameView.js';

class Cat {
    name = 'Cat';

    constructor(data, name) {
        this.name = name;
        this.id = data.id;
        this.img = new Image();
        this.url = data.url;

        this.img.addEventListener('load', function () {
            LoaderView.stop();
            NameView.show();
        });

        this.img.src = data.url;
    }
}

export default Cat;
