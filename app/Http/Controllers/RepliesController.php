<?php

namespace App\Http\Controllers;

use App\Http\Resources\Comment as CommentResource;
use Illuminate\Http\Request;
use App\Comment;

class RepliesController extends Controller
{
    public function store (Request $request, Comment $comment)
    {
    	$attributes = $request->validate(['body' => 'required|max:140']);
    	$attributes['user_id'] = auth()->id();
    	$attributes['commentable_type'] = 'App\Comment';
    	$attributes['commentable_id'] = $comment->id;
    	$attributes['parent_id'] = $comment->commentable_id;

    	$reply = Comment::create($attributes);

    	return new CommentResource($reply);
    }
}
