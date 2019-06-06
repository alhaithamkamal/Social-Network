<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;
use App\Http\resources\Post as PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
        
        return PostResource::collection($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'content' => 'required | max:280',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
        ]);
        $attributes['user_id'] = auth()->id();

        if ($request->hasFile('image')) {
            $img = $request->file('image');
            $imgname = 'post_images' . time() . '.' . $img->getClientOriginalExtension();
            $path = $img->storeAs('public/post_images', $imgname);
            $attributes['image'] = $imgname;
        }

        $post = Post::create($attributes);


        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function update(Request $request, Post $post)
    {
        $post->update($request->all());

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if($post->image){
            Storage::delete('public/post_images/' . $post->image);
        }
        $post->delete();

        return new PostResource($post);
    }
}
