import {offices} from './office_data.js';

// Старт: Рендер карты
ymaps.ready( function() {    
    let traskoMap = new ymaps.Map("trasko-map", {
        center: [54.80041640196402,54.16407765610452],
        zoom: 4
    });
    traskoMap.controls.remove('geolocationControl');
    traskoMap.controls.remove('searchControl');
    traskoMap.controls.remove('trafficControl');
    traskoMap.controls.remove('typeSelector');
    traskoMap.controls.remove('fullscreenControl');
    // traskoMap.behaviors.disable('scrollZoom');
    
    for (let i = 0; i < offices.length; i++) {
        let placemark = new ymaps.Placemark(
            offices[i].coord,
            {
                balloonContentHeader: `<a class="a-map" href="detail_map.html?${offices[i].name}">${offices[i].name}</a>`,
                balloonContentBody: `
                <b>Адрес: </b>${offices[i].address}<br>
                <b>Тел: </b><a href="tel:${offices[i].tel}">${offices[i].tel}</a><br>
                <b>e-mail: </b><a href="mailto:${offices[i].email}">${offices[i].email}</a>`,
                balloonContentFooter: '<a href="/company/vis_structure.php">Структура компании</a>'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/img/map-pin-blue.svg',
                iconImageSize: [35,35],
                iconImageOffset: [-20,-30]
            });
        traskoMap.geoObjects.add(placemark);
    }
});
// Конец

// Старт: Рендер филиалов
for (let i = 0; i < offices.length; i++) {
    document.querySelector('#branch').append(createNewBranchItem(offices[i]));
}

function createNewBranchItem(office) {
    let newBranchItem = document.createElement('div');
    newBranchItem.className = 'col-xxl-3 col-xl-4 col-6 d-flex';    
    newBranchItem.innerHTML = `
        <div class="branch-item">
            <div class="branch-name">
                <span class="city-id">${office.name}</span>
            </div>    
            <div class="branch-body">
                <div class="mb-2"><span>Адрес: </span>${office.address}</div>
                <div class="mb-2"><span>Телефон: </span><a href="tel:${office.tel}">${office.tel}</a></div>
                <div class="mb-2"><span>E-mail: </span><a href="mailto:${office.email}">${office.email}</a></div>
            </div>
        </div>
    `;
    return newBranchItem;
}
// Конец

// Старт: Передача таргета в detail_map 
document.querySelectorAll('.city-id').forEach( function(cityId) {
    cityId.addEventListener('click', function() {
      let encoded =  encodeURI('detail_map.html?' + cityId.innerHTML);
      location.href = decodeURI(encoded);
    });
});
// Конец