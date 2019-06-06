<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
	protected $guarded = [];

    public function user()
    {
    	return $this->belongsTo('App\User');
    }

    public function commentable()
    {
        return $this->morphTo();
    }

    public function likes()
	{
	    return $this->morphMany('App\Like', 'likeable');
	}

    public function replies()
    {
        return $this->morphMany('App\Comment', 'commentable');
    }

}
