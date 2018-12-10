<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    protected $fillable = ['url'];

    // public function contacts()
    // {
    //     return $this->belongsTo('App\Contact');
    // }
}
