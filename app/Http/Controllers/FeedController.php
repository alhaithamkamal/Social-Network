<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Post;
use App\User;

class FeedController extends Controller
{
    public function getFeed()
    {
    	$user = auth()->user();

    	$userIds = $user->follows()->pluck('followed_id');

    	$userIds[] = $user->id;

    	$feed = Post::whereIn('user_id', $userIds)->latest()->get();

    	return PostResource::collection($feed);
    }

    public function userFeed(User $user)
    {
    	$feed = $user->posts()->latest()->get();

    	return PostResource::collection($feed);
    }
}
