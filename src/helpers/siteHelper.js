'use strict'
import handleRequest from './requestHandler';

export function getResultsForSite(startDate, endDate, request, showSiteResult) {
    console.log('requestSite', request);
    handleRequest(request).then(
        response => {
            response = JSON.parse(response);
            if(response.code === 200) {
                showSiteResult(response.result);
            }
        }
    ).catch(
        error => {
            console.log('error', error);
        }
    );

}