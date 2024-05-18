import axios from 'axios';

/**
 * This function CAN BE used to upload image in specific url
 * Request ajax request to api action
 * @param {api url} url
 * @param {api method, eg: GET, POST, PUT} method
 * @param {api data, if need send to api} data
 * @param {callback function, if need to do any action after api response} callback
 */
export default async function callApiMultipart(url, method, data = {}, callback = null) {

    var api_url = '';
    var protocol = document.location.protocol;
    var host = window.location.hostname;
    if (host === "localhost") {
        api_url = 'http://localhost:1337';
    }else {       
        api_url = protocol + '//' + host + '/api';
    }

    const request = await axios({
        method: method,
        url: `${api_url}/${url}`,
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data
    })
        .then(function (res) {
            return res.data;
        })
        .then(res => {
            if (callback !== null) {
                callback(res);
            }
            return res;
        })
        .catch(function (error) {            
            if (callback) {
                callback(error.response ? error.response.data : error.response);
            }
            return error;
        });
    return request;
}