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
    const response = await fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

/**
 * @param {String} url
 * @param {Object} data
 */
async function postRequest(url, data) {
    return request(POST, url, data);
}

/**
 * @param {String} url
 */
async function deleteRequest(url) {
    return request(DELETE, url, data);
}

/**
 * @param {String} url
 * @param {Object} data
 */
async function getRequest(url, data) {
    return request(GET, url, data);
}

/**
 * @param {String} url
 * @param {Object} data
 */
async function putRequest(url, data) {
    return request(PUT, url, data);
}

//Example how to use
// postRequest('https://example.com/answer', { answer: 42 })
//     .then((data) => {
//         console.log(data); // JSON data parsed by `response.json()` call
//     });

export default {
    postRequest,
    deleteRequest,
    getRequest,
    putRequest
}