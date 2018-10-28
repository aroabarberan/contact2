<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prefix extends Model
{
    protected $fillable = [
        'id', 'name', 'flag', 'prefix',
    ];
}
