<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Follower extends Pivot
{
    public $incrementing = true;


    protected $guarded = [];
}
