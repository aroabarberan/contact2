<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'id', 'contact', 'tag', 'group',
    ];
}
