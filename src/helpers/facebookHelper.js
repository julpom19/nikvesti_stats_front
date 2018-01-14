'use strict'
/**
 * Created by Julia on 12.01.2018.
 */
import handleRequest from './requestHandler';

import generalConsts from '../constants/generalConsts';

let datas = [];

export function getResultsForFacebook(request, showFacebookResult) {
    FB.api(
        request,
        function (response) {
            console.log('response', response);
            console.log('response.error', response.error);
            if (response && !response.error) {
                datas = datas.concat(response.data);
                console.log("datas: ", datas);
                console.log("response.next: ", response.paging && response.paging.next);
                if (response.paging && response.paging.next) {
                    getResultsForFacebook(response.paging.next, showFacebookResult);
                } else {
                    let resultData = datas;
                    datas = [];
                    showFacebookResult(resultData);
                }
            }
        }
    );
}

