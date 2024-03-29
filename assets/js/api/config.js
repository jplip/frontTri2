export var uri;
if (location.hostname === "localhost") {
        uri = "http://localhost:8340";
} else if (location.hostname === "127.0.0.1") {
        uri = "http://127.0.0.1:8340";
} else {
        //uri = "https://fitness-back.stu.nighthawkcodingsociety.com/";
}

export const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
};