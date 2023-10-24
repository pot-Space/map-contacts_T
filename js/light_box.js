const photo = document.querySelectorAll('.photo-img'),
    lightBox = document.querySelector('.light-box'),
    buttonX = document.querySelector('.light-box-close'),
    lightBoxImg = document.querySelector('.light-box-img'),
    arrow = document.querySelectorAll('.arrow');


function arrPhoto() {
    let i = 1;
    for (item of photo) {
        item.style.backgroundImage = `url('${item.dataset.src}')`;
        i++;
    }
}
arrPhoto();

function setDataAttribute() {
    let t = 0;
    photo.forEach(function (item) {
        item.dataset.count = t;
        t++;
    });
}
setDataAttribute();

// Лайтбокс
photo.forEach(function (item) {
    item.addEventListener('click', () => {
        let src = item.dataset.src;

        lightBox.style.display = 'block';
        lightBoxImg.attributes.src.value = src;
        lightBoxImg.dataset.count = item.dataset.count;

        let dataCount = +lightBoxImg.dataset.count;

        arrow.forEach(function (item) {
            item.addEventListener('click', () => {
                if (item.attributes.class.nodeValue === 'arrow next') {
                    dataCount = dataCount + 1;
                    if (dataCount >= photo.length) {
                        dataCount = 0;
                    }
                    nextSlide(dataCount);
                }
                if (item.attributes.class.nodeValue === 'arrow prev') {
                    dataCount = dataCount - 1;
                    if (dataCount < 0) {
                        dataCount = photo.length - 1;
                    }
                    nextSlide(dataCount);
                }
            })
        });
        closeBox();
    });
})

function nextSlide(num) {
    let src = photo[num].dataset.src;
    lightBoxImg.attributes.src.value = src;
    lightBoxImg.dataset.count = num;
}

function closeBox() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            lightBox.style.display = 'none';
            lightBoxImg.attributes.src.value = '';
            lightBoxImg.dataset.count = '';
        }
    });

    lightBox.addEventListener('click', function (event) {
        let item = document.querySelector('.light-box-content');
        if (!item.contains(event.target)) {
            lightBox.style.display = 'none';
            lightBoxImg.attributes.src.value = '';
            lightBoxImg.dataset.count = '';
        };
    });
}