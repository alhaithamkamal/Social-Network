<?php

namespace App\Http\Resources;

use App\Http\Resources\Comment as CommentResource;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
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
            "content" => $this->content,
            'comments' => CommentResource::collection($this->comments),
            'user' => new UserResource($this->user),
            'likes' => $this->likes()->where('like', true)->count(),
            'dislikes' => $this->likes()->where('like', false)->count(),
            'image' => $this->image,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
