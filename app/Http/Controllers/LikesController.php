<?php

namespace App\Http\Controllers;

use App\Http\Resources\Comment as CommentResource;
use App\Http\resources\Post as PostResource;
use Illuminate\Http\Request;
use App\Notifications\PostLiked;
use App\Post;
use App\Like;
use App\User;
use App\Comment;

class LikesController extends Controller
{
    public function postLikesPost(Request $request, Post $post)
    {
    	$action = $request->get('action');
        $user = $post->user;
    	$vote = auth()->user()->likes()->where('likeable_type', 'App\Post')
    									->where('likeable_id', $post->id)
    									->first();
    	switch ($action) {
    		case 'like':
    			if ($vote) {
    				if ($vote->like){
    					$vote->delete();
    					return new PostResource($post);
    				} else {
    					$vote->like = 1;
                        $vote->save();
                        $user->notify(new PostLiked(auth()->user(), $post));
    					return new PostResource($post);
    				}
    			} else {
    				Like::create([
    					'user_id' => auth()->id(),
    					'likeable_id' => $post->id,
    					'likeable_type' => 'App\Post',
    					'like'=> true
    				]);
                    $user->notify(new PostLiked(auth()->user(), $post));
    				return new PostResource($post);
    			}
    			break;
    		
    		case 'dislike':
    			if ($vote) {
    				if ($vote->like){
    					$vote->like = 0;
                        $vote->save();
    					return new PostResource($post);				
    				} else {
    					$vote->delete();
    					return new PostResource($post);
    				}
    			} else {
    				Like::create([
    					'user_id' => auth()->id(),
    					'likeable_id' => $post->id,
    					'likeable_type' => 'App\Post',
    					'like'=> false
    				]);
    				return new PostResource($post);
    			}
    			break;
    		default:
    			return 'Wrong action value';
    	}
    }
    public function postCommentLikes(Request $request, Comment $comment)
    {
        $action = $request->get('action');
        $vote = auth()->user()->likes()->where('likeable_type', 'App\Comment')
                                        ->where('likeable_id', $comment->id)
                                        ->first();
        switch ($action) {
            case 'like':
                if ($vote) {
                    if ($vote->like){
                        $vote->delete();
                        return new CommentResource($comment);
                    } else {
                        $vote->like = 1;
                        $vote->save();
                        return new CommentResource($comment);
                    }
                } else {
                    Like::create([
                        'user_id' => auth()->id(),
                        'likeable_id' => $comment->id,
                        'likeable_type' => 'App\Comment',
                        'like'=> true
                    ]);
                    return new CommentResource($comment);
                }
                break;
            
            case 'dislike':
                if ($vote) {
                    if ($vote->like){
                        $vote->like = 0;
                        $vote->save();
                        return new CommentResource($comment);                 
                    } else {
                        $vote->delete();
                        return new CommentResource($comment);
                    }
                } else {
                    Like::create([
                        'user_id' => auth()->id(),
                        'likeable_id' => $comment->id,
                        'likeable_type' => 'App\Comment',
                        'like'=> false
                    ]);
                    return new CommentResource($comment);
                }
                break;
            default:
                return 'Wrong action value';
        }
    }

}
