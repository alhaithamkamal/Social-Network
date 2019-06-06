<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\Comment as CommentResource;

class Comment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "body" => $this->body,
            "parent_id" => $this->parent_id,
            "commentable_id" => $this->commentable_id,
            "commentable_type" => $this->commentable_type,
            "user" => new UserResource($this->user),
            'likes' => $this->likes()->where('like', true)->count(),
            'dislikes' => $this->likes()->where('like', false)->count(),
            'replies' => CommentResource::collection($this->replies),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
        ];
    }
}
