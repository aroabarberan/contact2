<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    protected $fillable = [
        'id', 'contact', 'url',
    ];
}
