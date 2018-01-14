'use strict'

import timepickerPreset from './presets/timepickerPreset';
import facebookPreset from './presets/facebookPreset';
import {getYoutubeVideos} from './helpers/youtubeHelper';
import {getResultsForFacebook} from './helpers/facebookHelper';
import {getResultsForSite} from "./helpers/siteHelper";
import generalConsts from './constants/generalConsts';
import * as httpRequests from './constants/httpRequests';

$(function() {
    timepickerPreset();
    facebookPreset();

    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        let startDate = new Date(picker.startDate.format('YYYY-MM-DD') + 'T00:00:00.000').toISOString();
        let endDate = new Date(picker.endDate.format('YYYY-MM-DD') + 'T23:59:59.000').toISOString();
        getYoutubeVideos(startDate, endDate, '', showYoutubeVideosResult);
        let fbReqForPosts = httpRequests.makeFacebookGetPostsRequest(startDate, endDate);
        let fbReqForVideos = httpRequests.makeFacebookGetVideosRequest(startDate, endDate);
        getResultsForFacebook(fbReqForPosts, showFacebookPostsResult);
        getResultsForFacebook(fbReqForVideos, showFacebookVideosResult);
        let siteNewsInfoReq = httpRequests.makeSiteGetInfoRequest('newsInfo', startDate, endDate);
        let siteArticlesInfoReq = httpRequests.makeSiteGetInfoRequest('articlesInfo', startDate, endDate);
        let siteBlogsInfoReq = httpRequests.makeSiteGetInfoRequest('blogsInfo', startDate, endDate);
        let sitePhotoreportInfoReq = httpRequests.makeSiteGetInfoRequest('photoreportInfo', startDate, endDate);
        let siteSourcesInfoReq = httpRequests.makeSiteGetInfoRequest('sourcesInfo', startDate, endDate);
        getResultsForSite(startDate, endDate, siteNewsInfoReq, showSiteNewsResult);
        getResultsForSite(startDate, endDate, siteArticlesInfoReq, showSiteArticlesResult);
        getResultsForSite(startDate, endDate, siteBlogsInfoReq, showSiteBlogsResult);
        getResultsForSite(startDate, endDate, sitePhotoreportInfoReq, showSitePhotoreportsResult);
        getResultsForSite(startDate, endDate, siteSourcesInfoReq, showSiteSourcesResult);


        
    });
});

function showYoutubeVideosResult (videos) {

    $('#youtubeResultTable tbody > tr').remove();
    videos.forEach(function (video, index) {
        let num = index + 1;
        let link = 'https://www.youtube.com/watch?v=' + video.id;
        let title = video.snippet.title;
        let date = new Date(video.snippet.publishedAt);
        let formattedDate = date.toString("dd.MM.yyyy HH:mm");
        let viewCount = video.statistics.viewCount;
        $('#youtubeResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' +
            '<a target="_blank" href="'+ link + '">' + title + '</a>' +
            '</td><td>' + formattedDate +
            '</td><td>' + viewCount +
            '</td></tr>');

    })
}

function showFacebookPostsResult (posts) {
    $('#facebookPostsResultTable tbody > tr').remove();
    $('#fbPostsTotalAmount').text('Общее количество новостей: ' + posts.length);
    posts.forEach(function (post, index) {
        let num = index + 1;
        let link = 'https://www.facebook.com/' + generalConsts.FACEBOOK_PAGE_ID + '/posts/' + post.id.split('_')[1];
        let title = (post.message) ? post.message : post.name;
        let date = new Date(post.created_time);
        let formattedDate = date.toString("dd.MM.yyyy HH:mm");
        let likesCount = post.likes.summary.total_count;
        let commentsCount = post.comments.summary.total_count;
        $('#facebookPostsResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' +
            '<a target="_blank" href="'+ link + '">' + title + '</a>' +
            '</td><td>' + formattedDate +
            '</td><td>' + likesCount +
            '</td><td>' + commentsCount +
            '</td></tr>');

    })
}

function showFacebookVideosResult (videos) {
    $('#facebookVideosResultTable tbody > tr').remove();
    $('#fbVideosTotalAmount').text('Общее количество видео: ' + videos.length);
    videos.forEach(function (video, index) {
        let num = index + 1;
        let link = video.source;
        let title = video.title;
        let date = new Date(video.created_time);
        let formattedDate = date.toString("dd.MM.yyyy HH:mm");
        let likesCount = video.likes.summary.total_count;
        let commentsCount = video.comments.summary.total_count;
        let viewCount = 0;
        $('#facebookVideosResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' +
            '<a target="_blank" href="'+ link + '">' + title + '</a>' +
            '</td><td>' + formattedDate +
            '</td><td>' + likesCount +
            '</td><td>' + commentsCount +
            '</td><td>' + viewCount +
            '</td></tr>');

    })
}

function showSiteNewsResult(news) {
    $('#siteNewsResultTable tbody > tr').remove();
    let i = 1;
    let mainTotalAmount = 0;
    for(let id in news) {
        let num = i;
        i++;
        let authorName = news[id].name;
        let nikoNewsCount = news[id].data.countNiko ? news[id].data.countNiko : 0;
        let ukrNewsCount = news[id].data.countUkr ? news[id].data.countUkr : 0;
        let worldNewsCount = news[id].data.countWorld ? news[id].data.countWorld : 0;
        let totalCount = nikoNewsCount + ukrNewsCount + worldNewsCount;
        mainTotalAmount += totalCount;
        $('#siteNewsResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' + authorName +
            '</td><td>' + nikoNewsCount +
            '</td><td>' + ukrNewsCount +
            '</td><td>' + worldNewsCount +
            '</td><td>' + totalCount +
            '</td></tr>');
    }
    $('#siteNewsTotalAmount').text('Общее количество новостей: ' + mainTotalAmount);
}

function showSitePhotoreportsResult(photoreports) {
    console.log('photoreports', photoreports);
    $('#sitePhotoreportsResultTable tbody > tr').remove();
    photoreports.forEach(function (photoreport, index) {
        let num = index + 1;
        let title = photoreport.title;
        let authorName = photoreport.author;
        let link = photoreport.link;
        $('#sitePhotoreportsResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' +
            '<a target="_blank" href="'+ link + '">' + title + '</a>' +
            '</td><td>' + authorName +
            '</td></tr>');
    });
    $('#sitePhotoreportsTotalAmount').text('Общее количество фоторепортажей: ' + photoreports.length);
}

function showSiteBlogsResult(blogs) {
    $('#siteBlogsResultTable tbody > tr').remove();
    let totalAmount = 0;
    blogs.forEach(function (blog, index) {
        let num = index + 1;
        let authorName = blog.author;
        let postCount = blog.blogCount;
        let viewCount = blog.viewCount;
        totalAmount += postCount;
        $('#siteBlogsResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' + authorName +
            '</td><td>' + postCount +
            '</td><td>' + viewCount +
            '</td></tr>');
    });
    $('#siteBlogsTotalAmount').text('Общее количество статей в блогах: ' + totalAmount);
}


function showSiteArticlesResult(articles) {
    $('#siteArticlesResultTable tbody > tr').remove();
    let i = 1;
    let mainTotalAmount = 0;
    for(let id in articles) {
        let num = i;
        i++;
        let authorName = articles[id].name;
        let countOfOwn = articles[id].data.countOfOwn ? articles[id].data.countOfOwn : 0;
        let countOfNotOwn = articles[id].data.countOfNotOwn ? articles[id].data.countOfNotOwn : 0;
        let totalCount = countOfOwn + countOfNotOwn;
        mainTotalAmount += totalCount;

        $('#siteArticlesResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' + authorName +
            '</td><td>' + countOfOwn +
            '</td><td>' + countOfNotOwn +
            '</td><td>' + totalCount +
            '</td></tr>');
    }
    $('#siteArticlesTotalAmount').text('Общее количество статей: ' + mainTotalAmount);
}

function showSiteSourcesResult(sources) {
    $('#siteSourcesResultTable tbody > tr').remove();
    let linksTotalAmount = 0;
    sources.forEach(function (source, index) {
        let num = index + 1;
        let sourceName = source.source_name;
        let linksCount = source.count;
        linksTotalAmount += linksCount;
        $('#siteSourcesResultTable tbody').append(
            '<tr><td>' + num +
            '</td><td>' + sourceName +
            '</td><td>' + linksCount +
            '</td></tr>');
    });
    $('#siteSourcesTotalAmount').text('Общее количество источников: ' + sources.length);
    $('#siteSourcesLinksTotalAmount').text('Общее количество ссылок на источники: ' + linksTotalAmount);
}


