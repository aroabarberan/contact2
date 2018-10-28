<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'id', 'contact', 'tag', 'title', 'description',
    ];
}
