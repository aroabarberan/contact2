<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $fillable = ['user','phone'];


    public function contacts()
    {
        return $this->belongsTo('App\Contact');
    }
}
