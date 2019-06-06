<?php
    
namespace App\Http\Controllers;

use Image;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();

        return UserController::collection($users);
    }

    
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|string|max:255|unique:users,email,'.$user->id,
            'avatar' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
        ]);
        
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avname = 'avatars' . time() . '.' . $avatar->getClientOriginalExtension();
            $path = $avatar->storeAs('public/avatars/', $avname);
            Image::make($avatar)->resize(300, 300)->save( storage_path('app/' . $path ) );
            $user->avatar = $avname;
        }
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        
        $user->save();

        return new UserResource($user);
    }

    public function showFollowing(User $user)
    {
        $following = $user->follows;

        return UserResource::collection($following);
    }

    public function showFollowers(User $user)
    {
        $followers = $user->followers;

        return UserResource::collection($followers);
    }

    public function getAuthUser(Request $request)
    {
        $user = $request->user();

        return new UserResource($user);
    }

    public function getUser(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
