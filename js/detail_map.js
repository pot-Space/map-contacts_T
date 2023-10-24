import { offices } from './office_data.js';

const resultLink = decodeURI(location.search.substring(1)),
    officeId = document.querySelector('#office-id'),
    officeKey = Object.keys(currentOffice()),
    officeValue = Object.values(currentOffice());

// Старт: Карта
ymaps.ready(function () {

    let traskoMap = new ymaps.Map("trasko-map", {
        center: currentOffice().coord,
        zoom: 17
    });

    traskoMap.controls.remove('geolocationControl');
    traskoMap.controls.remove('searchControl');
    traskoMap.controls.remove('trafficControl');
    traskoMap.controls.remove('typeSelector');
    traskoMap.controls.remove('fullscreenControl');
    traskoMap.behaviors.disable('scrollZoom');

    let placemark = new ymaps.Placemark(
        currentOffice().coord,
        {
            balloonContentHeader: `${currentOffice().name}`,
            balloonContentBody: `
            <b>Адрес: </b>${currentOffice().address}<br>
            <b>Тел: </b><a href="tel:${currentOffice().tel}">${currentOffice().tel}</a><br>
            <b>e-mail: </b><a href="mailto:${currentOffice().email}">${currentOffice().email}</a>`,
            balloonContentFooter: '<a href="/company/vis_structure.php">Структура компании</a>'
        },
        {
            iconLayout: 'default#image',
            iconImageHref: '/img/map-pin-blue.svg',
            iconImageSize: [50, 50],
            iconImageOffset: [-30, -40]
        });
    traskoMap.geoObjects.add(placemark);
});
// Конец: Карта

// Старт: Получение текущего офиса
function currentOffice() {
    for (let i = 0; i < offices.length; i++) {
        if (offices[i].name == resultLink) {
            return offices[i]
        }
    }
};
// Конец

// Старт: Рендер текущего офиса
function createItemOffice() {
    let itemOffice = document.createElement('div'),
        temArr = ['Адрес', 'Юридический адрес', 'Директор', 'Телефон', 'E-mail', 'Дата основания', 'Подразделение в структуре'];
    itemOffice.className = 'row mt-2 p-3 pb-0';
    itemOffice.innerHTML = ``;

    for (let i = 0; i < 6; i++) {
        itemOffice.innerHTML +=
            `<div class="row col-xl-12 col-6 m-0 mb-3 p-0">
                <div class="col-3 p-0">
                    <div class="img-detail" style="background-image: url(/img/${officeKey[i]}.svg)"}></div>
                </div>
                <div class="col-9 text-detail p-0"> 
                    <p>${temArr[i]}</p>
                    ${officeKey[i] == 'director' ? `<a href="#">${officeValue[i]}</a>` : officeKey[i] == 'tel' ? `<a href="tel:${officeValue[i]}">${officeValue[i]}</a>` : officeKey[i] == 'email' ? `<a href="mailto:${officeValue[i]}">${officeValue[i]}</a>` : `<div>${officeValue[i]}</div>`}
                </div>
            </div>`;
    };
    itemOffice.innerHTML +=
        `<div class="row col-xl-12 col-6 m-0 mb-3 p-0">
            <div class="col-3 p-0">
                <div class="img-detail" style="background-image: url(/img/structure.svg)"}></div>
            </div>
            <div class="col-9 text-detail p-0">
                <a class="structure-link" href="/company/vis_structure.php">Подразделение в структуре</a>
            </div>
        </div>`;
    return itemOffice
};

officeId.prepend(createItemOffice(currentOffice()));

// Старт: Автовысота
actualResizeHandler();
window.addEventListener("resize", resizeThrottler, false);

function resizeThrottler() {
    let resizeTimeout;
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            actualResizeHandler();
        }, 66);
    }
};

function actualResizeHandler() {
    let getIdOffice = document.getElementById('office-id'),
        getIdMap = document.getElementById('trasko-map'),
        getPhotoBox = document.querySelectorAll('.office-photo'),
        getIdAboutOffice = document.getElementById('about-office-id');

    if (getIdOffice.offsetHeight !== getIdMap.offsetHeight) {
        getIdMap.style.height = getIdOffice.offsetHeight + 'px';
    }

    getPhotoBox.forEach(elem => {
        if (elem.offsetHeight !== getIdAboutOffice.offsetHeight)
            elem.style.height = getIdAboutOffice.offsetHeight + 'px';
    });
};
// Конец