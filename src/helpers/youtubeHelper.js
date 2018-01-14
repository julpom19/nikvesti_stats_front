'use strict'
import handleRequest from './requestHandler';
import * as httpRequests from '../constants/httpRequests';

let videos = [];
export function getYoutubeVideos(startDate, endDate, pageToken, showYoutubeVideosResult) {
    let getVideosIdRequest = httpRequests.makeYoutubeGetVideosIdFromNextPageRequest(startDate, endDate, pageToken);
    handleRequest(getVideosIdRequest).then(
        response => {
            let jsonIdsResponse = JSON.parse(response);
            let arrayOfIds = getVideosIds(jsonIdsResponse);
            let videoIdsStr = arrayOfIds.toString();
            let getVideosInfoRequest = httpRequests.makeYoutubeGetVideosInfoRequest(videoIdsStr);
            handleRequest(getVideosInfoRequest).then(
                response => {
                    let jsonVideosResponse = JSON.parse(response);
                    videos = videos.concat(jsonVideosResponse.items);
                    if(jsonIdsResponse.nextPageToken) {
                        getYoutubeVideos(startDate, endDate, jsonIdsResponse.nextPageToken, showYoutubeVideosResult);
                    } else {
                        let totalAmount = videos.length;
                        $('#videoTotalAmount').text('Общее количество видео: ' + totalAmount);
                        let res = videos;
                        videos = [];
                        showYoutubeVideosResult(res);
                    }

                }
            ).catch(
                error => {
                    console.log('error', error);
                }
            );
        }
    ).catch(
        error => {
            console.log('error', error);
        }
    );
}

function getVideosIds(jsonResponse) {
    let videos = jsonResponse.items;
    let arrayOfIds = [];
    for(let video of videos) {
        arrayOfIds.push(video.id.videoId)
    }
    return arrayOfIds;
}




