/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Julia on 11.01.2018.
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    YOUTUBE_CHANNEL_ID: 'UC25UWq7xeoDDA208h_59fHA',
    YOUTUBE_AUTH_KEY: 'AIzaSyCAUpLb5clMQLj0NEmEtu0OQiIh3RrOAus',
    FACEBOOK_PAGE_ID: 'nikvesti',
    FACEBOOK_APP_ID: '126464358158432',
    FACEBOOK_APP_SECRET: '59b7457005353b6688a5911c439e7471',
    // SERVER_URL: 'http://localhost:3000/'
    SERVER_URL: 'https://nikvesti.herokuapp.com/'
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Julia on 10.01.2018.
 */


/* harmony default export */ __webpack_exports__["a"] = (function (requestURL) {
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
});








/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = makeYoutubeGetVideosInfoRequest;
/* unused harmony export makeYoutubeGetVideosIdRequest */
/* harmony export (immutable) */ __webpack_exports__["d"] = makeYoutubeGetVideosIdFromNextPageRequest;
/* harmony export (immutable) */ __webpack_exports__["a"] = makeFacebookGetPostsRequest;
/* harmony export (immutable) */ __webpack_exports__["b"] = makeFacebookGetVideosRequest;
/* harmony export (immutable) */ __webpack_exports__["c"] = makeSiteGetInfoRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generalConsts__ = __webpack_require__(0);
/**
 * Created by Julia on 10.01.2018.
 */



function makeYoutubeGetVideosInfoRequest(videosId) {
    return 'https://www.googleapis.com/youtube/v3/videos?' +
    'id=' + videosId +
    '&key=' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].YOUTUBE_AUTH_KEY +
    '&fields=items(id,snippet(title,publishedAt),statistics(viewCount))' +
    '&part=snippet,statistics';
}



function makeYoutubeGetVideosIdRequest(publishedAfter, publishedBefore) {
    return 'https://www.googleapis.com/youtube/v3/search?part=id' +
    '&channelId=' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].YOUTUBE_CHANNEL_ID +
    '&key=' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].YOUTUBE_AUTH_KEY +
    '&type=video' +
    '&publishedAfter=' + publishedAfter +
    '&publishedBefore=' + publishedBefore +
    '&maxResults=50' +
    '&order=date' +
    '&fields=items(id(videoId)),pageInfo,nextPageToken';
}

function makeYoutubeGetVideosIdFromNextPageRequest(publishedAfter, publishedBefore, nextPageToken) {
    return makeYoutubeGetVideosIdRequest(publishedAfter, publishedBefore) + '&pageToken=' + nextPageToken;
}

function makeFacebookGetPostsRequest(publishedAfter, publishedBefore) {
    return 'https://graph.facebook.com/' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].FACEBOOK_PAGE_ID +
            '/posts?fields=message,name,created_time,comments.limit(0).summary(true),likes.limit(0).summary(true)' +
            '&limit=100' +
            '&since=' + publishedAfter +
            '&until=' + publishedBefore +
            '&access_token=' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].FACEBOOK_APP_ID + '|' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].FACEBOOK_APP_SECRET;
}

function makeFacebookGetVideosRequest(publishedAfter, publishedBefore) {
    return 'https://graph.facebook.com/' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].FACEBOOK_PAGE_ID +
        '/videos?fields=source,title,created_time,comments.limit(0).summary(true),likes.limit(0).summary(true),video_insights' +
        '&limit=100' +
        '&since=' + publishedAfter +
        '&until=' + publishedBefore +
        '&access_token=' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].FACEBOOK_APP_ID + '|' + __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].FACEBOOK_APP_SECRET;
}

function makeSiteGetInfoRequest(infoType, publishedAfter, publishedBefore) {
    return __WEBPACK_IMPORTED_MODULE_0__generalConsts__["a" /* default */].SERVER_URL + infoType + '?startDate=' + publishedAfter + '&endDate=' + publishedBefore;
}









/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__presets_timepickerPreset__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__presets_facebookPreset__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_youtubeHelper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_facebookHelper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_siteHelper__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_generalConsts__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__ = __webpack_require__(2);










$(function() {
    Object(__WEBPACK_IMPORTED_MODULE_0__presets_timepickerPreset__["a" /* default */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__presets_facebookPreset__["a" /* default */])();

    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        let startDate = new Date(picker.startDate.format('YYYY-MM-DD') + 'T00:00:00.000').toISOString();
        let endDate = new Date(picker.endDate.format('YYYY-MM-DD') + 'T23:59:59.000').toISOString();
        Object(__WEBPACK_IMPORTED_MODULE_2__helpers_youtubeHelper__["a" /* getYoutubeVideos */])(startDate, endDate, '', showYoutubeVideosResult);
        let fbReqForPosts = __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__["a" /* makeFacebookGetPostsRequest */](startDate, endDate);
        let fbReqForVideos = __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__["b" /* makeFacebookGetVideosRequest */](startDate, endDate);
        Object(__WEBPACK_IMPORTED_MODULE_3__helpers_facebookHelper__["a" /* getResultsForFacebook */])(fbReqForPosts, showFacebookPostsResult);
        Object(__WEBPACK_IMPORTED_MODULE_3__helpers_facebookHelper__["a" /* getResultsForFacebook */])(fbReqForVideos, showFacebookVideosResult);
        let siteNewsInfoReq = __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__["c" /* makeSiteGetInfoRequest */]('newsInfo', startDate, endDate);
        let siteArticlesInfoReq = __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__["c" /* makeSiteGetInfoRequest */]('articlesInfo', startDate, endDate);
        let siteBlogsInfoReq = __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__["c" /* makeSiteGetInfoRequest */]('blogsInfo', startDate, endDate);
        let sitePhotoreportInfoReq = __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__["c" /* makeSiteGetInfoRequest */]('photoreportInfo', startDate, endDate);
        let siteSourcesInfoReq = __WEBPACK_IMPORTED_MODULE_6__constants_httpRequests__["c" /* makeSiteGetInfoRequest */]('sourcesInfo', startDate, endDate);
        Object(__WEBPACK_IMPORTED_MODULE_4__helpers_siteHelper__["a" /* getResultsForSite */])(startDate, endDate, siteNewsInfoReq, showSiteNewsResult);
        Object(__WEBPACK_IMPORTED_MODULE_4__helpers_siteHelper__["a" /* getResultsForSite */])(startDate, endDate, siteArticlesInfoReq, showSiteArticlesResult);
        Object(__WEBPACK_IMPORTED_MODULE_4__helpers_siteHelper__["a" /* getResultsForSite */])(startDate, endDate, siteBlogsInfoReq, showSiteBlogsResult);
        Object(__WEBPACK_IMPORTED_MODULE_4__helpers_siteHelper__["a" /* getResultsForSite */])(startDate, endDate, sitePhotoreportInfoReq, showSitePhotoreportsResult);
        Object(__WEBPACK_IMPORTED_MODULE_4__helpers_siteHelper__["a" /* getResultsForSite */])(startDate, endDate, siteSourcesInfoReq, showSiteSourcesResult);


        
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
        let link = 'https://www.facebook.com/' + __WEBPACK_IMPORTED_MODULE_5__constants_generalConsts__["a" /* default */].FACEBOOK_PAGE_ID + '/posts/' + post.id.split('_')[1];
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




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Julia on 12.01.2018.
 */
/* harmony default export */ __webpack_exports__["a"] = (function() {
    var start = moment();
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    }

    function initialLabel() {
        $('#reportrange span').html('Выберите период');
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        // autoApply: true,
        opens: 'right',
        ranges: {
            'Сегодня': [moment(), moment()],
            'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
            'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
            'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
            'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        "locale": {
            "format": "MM/DD/YYYY",
            "separator": " - ",
            "applyLabel": "Применить",
            "cancelLabel": "Отмена",
            "fromLabel": "От",
            "toLabel": "До",
            "customRangeLabel": "Выбрать период",
            "weekLabel": "W",
            "daysOfWeek": [
                "Вс",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб"
            ],
            "monthNames": [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            "firstDay": 1
        }
    }, cb);

    initialLabel();


});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_generalConsts__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (function() {
    window.fbAsyncInit = function() {
        FB.init({
            appId            : __WEBPACK_IMPORTED_MODULE_0__constants_generalConsts__["a" /* default */].FACEBOOK_APP_ID,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.11'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getYoutubeVideos;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestHandler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_httpRequests__ = __webpack_require__(2);




let videos = [];
function getYoutubeVideos(startDate, endDate, pageToken, showYoutubeVideosResult) {
    let getVideosIdRequest = __WEBPACK_IMPORTED_MODULE_1__constants_httpRequests__["d" /* makeYoutubeGetVideosIdFromNextPageRequest */](startDate, endDate, pageToken);
    Object(__WEBPACK_IMPORTED_MODULE_0__requestHandler__["a" /* default */])(getVideosIdRequest).then(
        response => {
            let jsonIdsResponse = JSON.parse(response);
            let arrayOfIds = getVideosIds(jsonIdsResponse);
            let videoIdsStr = arrayOfIds.toString();
            let getVideosInfoRequest = __WEBPACK_IMPORTED_MODULE_1__constants_httpRequests__["e" /* makeYoutubeGetVideosInfoRequest */](videoIdsStr);
            Object(__WEBPACK_IMPORTED_MODULE_0__requestHandler__["a" /* default */])(getVideosInfoRequest).then(
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






/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getResultsForFacebook;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestHandler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_generalConsts__ = __webpack_require__(0);

/**
 * Created by Julia on 12.01.2018.
 */




let datas = [];

function getResultsForFacebook(request, showFacebookResult) {
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



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getResultsForSite;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestHandler__ = __webpack_require__(1);



function getResultsForSite(startDate, endDate, request, showSiteResult) {
    console.log('requestSite', request);
    Object(__WEBPACK_IMPORTED_MODULE_0__requestHandler__["a" /* default */])(request).then(
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

/***/ })
/******/ ]);