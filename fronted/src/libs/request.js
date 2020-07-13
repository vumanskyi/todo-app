const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';
const DELETE = 'DELETE';

/**
 * @var {Object} - list of available methods
 */
export const METHODS = {
    POST,
    PUT,
    DELETE,
    GET
};

/**
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 *
 */
async function request(method = GET, url= '', data = {}) {

    const object = {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };


    if (method === POST || method === PUT) {
        console.log(data);
        console.log(JSON.stringify(data));
        object.body = JSON.stringify(data);
    }

    const response = await fetch(url, object);

    return await response.json();
}

/**
 * @param {String} url
 * @param {Object} data
 */
export async function postRequest(url, data) {
    return request(POST, url, data);
}

/**
 * @param {String} url
 */
export async function deleteRequest(url) {
    return request(DELETE, url, data);
}

/**
 * @param {String} url
 * @param {Object} data
 */
export async function getRequest(url, data) {
    return request(GET, url, data);
}

/**
 * @param {String} url
 * @param {Object} data
 */
export async function putRequest(url, data) {
    return request(PUT, url, data);
}

//Example how to use
// postRequest('https://example.com/answer', { answer: 42 })
//     .then((data) => {
//         console.log(data); // JSON data parsed by `response.json()` call
//     });
