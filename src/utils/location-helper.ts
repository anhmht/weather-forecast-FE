import { LocationServices } from '../service/location-service/location.service';

export const getCurrentLocation = () => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000
    };
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, options);
    });
}

export const displayLocation = (coordinate = null)  => new Promise( async (resolve) => {
    var locationService = new LocationServices();
    let lon = null;
    let lat = null;
    if (coordinate) {
        lon = coordinate.lon;
        lat = coordinate.lat;
    } else {
        const position = await getCurrentLocation() as any;
        lon = position.coords.longitude;
        lat = position.coords.latitude
    }
    const cached = sessionStorage.getItem('position');
    if (cached) {
        resolve(JSON.parse(cached));
    } else {
        lon = 105.623;
        lat = 10.1002;

        locationService.getCurrentLocation(lat, lon).then((res: any) => {
            let region = res.data[0].region;
            let regionCode = res.data[0].region_code;
            sessionStorage.setItem('position', JSON.stringify({ lat, lon, region, regionCode }));
        }).catch(error => {
            console.log(error);
        })
    }    
})

/* export const displayLocation = (coordinate = null)  => new Promise( async (resolve) => {
    var request = new XMLHttpRequest();
    let lon = null;
    let lat = null;
    if (coordinate) {
        lon = coordinate.lon;
        lat = coordinate.lat;
    } else {
        const position = await getCurrentLocation() as any;
        lon = position.coords.longitude;
        lat = position.coords.latitude
    }
    const cached = sessionStorage.getItem('position');
    if (cached) {
        resolve(JSON.parse(cached));
    } else {
        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyCzHAjh3QPNyB097xrBsITXLr125vJxsc0';
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                sessionStorage.setItem('position', JSON.stringify({ lat, lon, data }));
                resolve({ lat, lon, data });
            }
        };
        request.send();
    }

}) */
