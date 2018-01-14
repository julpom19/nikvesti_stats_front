/**
 * Created by Julia on 10.01.2018.
 */
"use strict"

export default function (requestURL) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', requestURL, true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                var error = new Error(xhr.statusText);
                error.code = xhr.status;
                reject(error);
            }
        }
        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };
        xhr.send();
    });
}






