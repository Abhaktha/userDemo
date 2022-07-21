import moment from 'moment-timezone';
import { Avatar } from "@material-ui/core";

export function nameRenderer(params) {
    let fullName = '';
    if (params.data) {
        let name = params.data.name;
        fullName = name.first + ' ' + name.last;
    }
    return fullName;

}

export function locationRenderer(params) {
    let locationDetails = '';
    if (params.data) {
        let location = params.data.location;
        locationDetails = location.city + ', ' + location.country;
    }
    return locationDetails;

}

export function registeredDateRenderer(params) {
    let registeredDetail = '';
    if (params.data) {
        let registered = params.data.registered
        registeredDetail = registered.date;
    }
    return moment(registeredDetail).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("DD-MM-YYYY HH:mm A z");

}

export function pictureRenderer(params) {
    let pictureDetail = '';
    if (params.data) {
        let picture = params.data.picture
        pictureDetail = picture.thumbnail;
    }
    return <Avatar src={pictureDetail} alt='' sx={{ width: 15, height: 15 }} variant="square" />;

}