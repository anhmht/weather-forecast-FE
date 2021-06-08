import { BASE_CLOUD_URL } from './../constant/common-constant';
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
        locationService.getCurrentLocation(lat, lon).then((res: any) => {
            let regionCode = res.data[0].region_code;
            let region = res.data[0].region;
            sessionStorage.setItem('position', JSON.stringify({ lat, lon, regionCode, region }));
            resolve({ lat, lon, regionCode, region });
        }).catch(error => {
            console.log(error);
        })
    }
})

export const getGeoJson = (level, name) => new Promise(async (resolve,reject) => {
    const url = `${BASE_CLOUD_URL}file/${level}/${name}.geojson`
    fetch(url).then(async html => {
        const geojson = await JSON.parse(await html.text());
        resolve(geojson)
    }).catch(err => {
        console.log(err);
        reject(null);
    })
})
