<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event_tag extends Model
{
    protected $fillable = [
        'id', 'tag',
    ];
}
