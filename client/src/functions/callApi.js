import axios from 'axios';
/**
 * Request ajax request to api action
 * @param {api url} url
 * @param {api method, eg: GET, POST, PUT} method
 * @param {api data, if need send to api} data
 * @param {callback function, if need to do any action after api response} callback
 */
export default async function callApi(url, method, data = {}, callback = null) {
    var api_url = '';
    var protocol = document.location.protocol;
    var host = window.location.hostname;
    if (host === "localhost") {
        api_url = 'http://localhost:1337';
    }else {       
        api_url = protocol + '//' + host + '/api';
    }

    // if (method !== 'GET') {
    //     data = (!data) ? data = {} : data;
    //     var csrf = await axios({
    //         method: 'GET',
    //         url: `${api_url}/csrfToken`,
    //         withCredentials: true,
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     });
    //     data['_csrf'] = csrf.data._csrf;
    // }

    const request = await axios({
        method: method,
        url: `${api_url}/${url}`,
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: data,
        params: method === 'GET' ? data : ''
    }).then(function (res) {
        return res.data;
    }).then(res => {
        if (callback !== null) {
            callback(res);
        }
        return res;
    }).catch(async function (error) {
        if (typeof error.response !== 'undefined' && error.response.status === 403) {
            console.log("403 occurs");

            const request = await axios({
                method: method,
                url: `${api_url}/${url}`,
                withCredentials: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: data
            }).then(function (res) {
                return res.data;
            }).then(res => {
                if (callback !== null) {
                    callback(res);
                }
                return res;
            }).catch(function (error) {
                if (callback !== null) {
                    callback(error.response ? error.response.data : error.response);
                }
            });
            return request;

        }
        if (callback) {
            callback(error.response ? error.response.data : error.response);
        }
        return error.response;
    });
    return request;
}