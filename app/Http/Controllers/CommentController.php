<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Comment;
use App\Http\Resources\Comment as CommentResource;

class CommentController extends Controller
{
    public function index(Post $post)
    {
    	$comments = $post->comments;

    	return CommentResource::collection($comments);
    }

    public function store(Request $request, Post $post)
    {
    	$attributes = $request->validate(['body' => 'required|max:140']);
    	$attributes['user_id'] = auth()->id();
    	$attributes['commentable_type'] = 'App\Post';
    	$attributes['commentable_id'] = $post->id;

    	$comment = Comment::create($attributes);

    	return new CommentResource($comment);
    }

    public function show(Comment $comment)
    {
        return new CommentResource($comment);
    }

    public function update(Request $request, Comment $comment)
    {
    	$comment->update($request->all());

    	return new CommentResource($comment);

    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return new CommentResource($comment);
    }
}
