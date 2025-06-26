"use strict"
const {getCSVContentAsArray} = require(`./lib/readCSV.js`);

const readTicks = async (filename) => {
    const arr = await getCSVContentAsArray(filename);
    return arr;
}

// Currently, the top row is:
// ["Date","Route","Rating","Notes","URL","Pitches","Location","Avg Stars","Your Stars","Style","Lead Style","Route Type","Your Rating","Length","Rating Code"]
// So "Date" is col 0, "Route" is col 1, "Location" is col 6.

const ROUTE_INDEX = 1;
const LOCATION_INDEX = 6;

// collect all routes done in "New York > The Gunks".
// count by route name, good enough for uniqueness.
const groupByUniqueRoute = (routes) => {
    const map = {};
    const locations = {};
    routes.forEach((route) => {
        const routeLocation = route[LOCATION_INDEX];
        if (routeLocation.startsWith(`New York > The Gunks`) &&
            routeLocation.indexOf(`Peterskill`) < 0) {
            locations[routeLocation] = routeLocation;
            const routeName = route[ROUTE_INDEX];
            // const routeUrl = route[URL_INDEX];
            if (typeof map[routeName] != 'number') {
                map[routeName] = 0;
            }
            map[routeName]++;
        }
    });
    // for debugging:
    // console.log(JSON.stringify(locations));
    return map;
};

readTicks(`sample.csv`).then(result => {
    // TODO further processing.
    try {
        const map = groupByUniqueRoute(result);
        const keys = Object.keys(map);
        let counter = 0;
        let totalRoutes = 0;
        keys.forEach((key) => {
            counter++;
            totalRoutes += map[key];
            console.log(`${key}: ${map[key]}`);
        });
        console.log(`Total of unique ${counter} routes`);
        console.log(`Total of all (non-unique) ${totalRoutes} routes`);
    } catch (e) {
        console.log(e);
    }
    console.log(`done`);
}).catch((err) => {
    console.error("Error: ", err);
});