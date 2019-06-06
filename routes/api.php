<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1'], function(){
    Route::post('/login', 'AuthController@login');
    Route::post('/register', 'AuthController@register');

    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('/notifications/markasread', 'UserRequestsController@markAllAsRead');
        Route::get('/notifications', 'UserRequestsController@notifications');
        Route::get('/notifications/unread', 'UserRequestsController@unreadNotifications');
        Route::post('/user/follow/{user}', 'UserRequestsController@follow')->name('follow');
        Route::delete('/user/unfollow/{user}', 'UserRequestsController@unfollow')->name('unfollow');
        Route::get('/user', 'UserController@getAuthUser')->name('authUser');
        Route::get('/user/{user}', 'UserController@getUser')->name('user');
        Route::get('/user/{user}/followers', 'UserController@showFollowers')->name('user.followers');
        Route::get('/user/{user}/following', 'UserController@showFollowing')->name('user.following');
        Route::patch('/users/{user}', 'UserController@update')->name('users.update');
        Route::post('/logout', 'AuthController@logout')->name('logout');
        Route::apiResource('posts', 'PostController');
        Route::post('/comments/{post}', 'CommentController@store')->name('comments.store');
        Route::post('/replies/{comment}', 'RepliesController@store')->name('replies.store');
        Route::patch('/comments/{comment}', 'CommentController@update')->name('comments.update');
        Route::get('/comments/{post}', 'CommentController@index')->name('comments.show');
        Route::delete('/comments/{comment}', 'CommentController@destroy')->name('comments.destroy');
        Route::get('/posts/comments/{comment}', 'CommentController@show')->name('getComment');
        Route::get('/myfeed', 'FeedController@getFeed')->name('feed');
        Route::post('/posts/reaction/{post}', 'LikesController@postLikesPost')->name('likePost');
        Route::post('/comments/reaction/{comment}', 'LikesController@postCommentLikes')->name('likeComment');
    });
});