<?php

namespace App\Http\Controllers;

use App\User;
use App\Follower;
use Illuminate\Http\Request;
use App\Events\NewNotification;
use App\Notifications\UserFollowed;
use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;

class UserRequestsController extends Controller
{

    public function follow(Request $request, User $user)
    {
        $Follower = $request->user();

        if($Follower->canFollow($user)) {
            $Follower->follows()->attach($user);
            
            $user->notify(new UserFollowed($Follower));
        }

        return new UserResource($user);
    }

    public function unfollow(Request $request, User $user)
    {
       if($request->user()->canUnFollow($user)) {
           $request->user()->follows()->detach($user);
        }
           return new UserResource($user);
    }

    public function notifications()
    {
        return auth()->user()->notifications()->limit(5)->get()->toArray();
    }

    public function unreadNotifications()
    {
        return auth()->user()->unreadNotifications()->limit(5)->get()->toArray();
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();
        
        return auth()->user()->unreadNotifications()->limit(5)->get()->toArray();
    }
}