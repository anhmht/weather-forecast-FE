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

export const getIpAddress = () => new Promise(async (resolve, reject) => {
    fetch('https://api.ipify.org/?format=json').then(async (res: any) => {
        const address = await JSON.parse(await res.text());
        resolve(address.ip)
    }).catch(err => {
        console.log(err);
        reject(null);
    })
})

export const displayLocation = (coordinate = null)  => new Promise( async (resolve) => {
    var locationService = new LocationServices();
    const ipAddress = await getIpAddress() as any;
    const cached = sessionStorage.getItem('position');
    if (cached) {
        resolve(JSON.parse(cached));
    } else {
        locationService.getCurrentLocation(ipAddress).then((res: any) => {
            let regionCode = res.region_code;
            let region = res.region_name;
            sessionStorage.setItem('position', JSON.stringify({ ipAddress, regionCode, region }));
            resolve({ regionCode, region });
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
