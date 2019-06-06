<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
	protected $guarded = [];

    public function user ()
    {
    	return $this->belongsTo('App\User');
    }
    
    public function likable()
    {
        return $this->morphTo();
    }
}
