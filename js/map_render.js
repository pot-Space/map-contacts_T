'use strict';

class MainMap {    
    constructor(id, center, zoom) {
        this.map = new ymaps.Map('trasko-map', {
            center: center,
            zoom: zoom
        });
    }

    controls () {        
        this.map.controls.remove('geolocationControl');
        this.map.controls.remove('searchControl');
        this.map.controls.remove('trafficControl');
        this.map.controls.remove('typeSelector');
        this.map.controls.remove('fullscreenControl');
        this.map.behaviors.disable('scrollZoom');
    }

    placemark (coord) {
        this.map.geoObjects.add(new ymaps.Placemark(
            coord,
            {
                balloonContentHeader: `<a class="a-map" href="detail_map.html?ссылка">Ссылка на офис</a>`,
                balloonContentBody: `
                    <b>Адрес: </b>Адрес<br>
                    <b>Тел: </b><a href="tel:ссылка на телефон">Телефон</a><br>
                    <b>e-mail: </b><a href="mailto:ссылка на имейл">Имейл</a>`,
                balloonContentFooter: '<a href="/company/vis_structure.php">Структура компании</a>'
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '/img/map-pin-blue.svg',
                iconImageSize: [35,35],
                iconImageOffset: [-20,-30]
            })            
        );
    }
}

ymaps.ready(()=>{
    var traskoMap = new MainMap('trasko-map', [54.80041640196402,54.16407765610452], 4);
    traskoMap.controls();
    traskoMap.placemark([54,54]);
});