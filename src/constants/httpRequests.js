/**
 * Created by Julia on 10.01.2018.
 */
'use strict'
import generalConsts from './generalConsts';

export function makeYoutubeGetVideosInfoRequest(videosId) {
    return 'https://www.googleapis.com/youtube/v3/videos?' +
    'id=' + videosId +
    '&key=' + generalConsts.YOUTUBE_AUTH_KEY +
    '&fields=items(id,snippet(title,publishedAt),statistics(viewCount))' +
    '&part=snippet,statistics';
}



export function makeYoutubeGetVideosIdRequest(publishedAfter, publishedBefore) {
    return 'https://www.googleapis.com/youtube/v3/search?part=id' +
    '&channelId=' + generalConsts.YOUTUBE_CHANNEL_ID +
    '&key=' + generalConsts.YOUTUBE_AUTH_KEY +
    '&type=video' +
    '&publishedAfter=' + publishedAfter +
    '&publishedBefore=' + publishedBefore +
    '&maxResults=50' +
    '&order=date' +
    '&fields=items(id(videoId)),pageInfo,nextPageToken';
}

export function makeYoutubeGetVideosIdFromNextPageRequest(publishedAfter, publishedBefore, nextPageToken) {
    return makeYoutubeGetVideosIdRequest(publishedAfter, publishedBefore) + '&pageToken=' + nextPageToken;
}

export function makeFacebookGetPostsRequest(publishedAfter, publishedBefore) {
    return 'https://graph.facebook.com/' + generalConsts.FACEBOOK_PAGE_ID +
            '/posts?fields=message,name,created_time,comments.limit(0).summary(true),likes.limit(0).summary(true)' +
            '&limit=100' +
            '&since=' + publishedAfter +
            '&until=' + publishedBefore +
            '&access_token=' + generalConsts.FACEBOOK_APP_ID + '|' + generalConsts.FACEBOOK_APP_SECRET;
}

export function makeFacebookGetVideosRequest(publishedAfter, publishedBefore) {
    return 'https://graph.facebook.com/' + generalConsts.FACEBOOK_PAGE_ID +
        '/videos?fields=source,title,created_time,comments.limit(0).summary(true),likes.limit(0).summary(true),video_insights' +
        '&limit=100' +
        '&since=' + publishedAfter +
        '&until=' + publishedBefore +
        '&access_token=' + generalConsts.FACEBOOK_APP_ID + '|' + generalConsts.FACEBOOK_APP_SECRET;
}

export function makeSiteGetInfoRequest(infoType, publishedAfter, publishedBefore) {
    return generalConsts.SERVER_URL + infoType + '?startDate=' + publishedAfter + '&endDate=' + publishedBefore;
}







