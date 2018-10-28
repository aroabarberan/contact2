<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    protected $fillable = [
        'id', 'contact', 'tag', 'name',
    ];
}
