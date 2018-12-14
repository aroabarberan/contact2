<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $fillable = ['phone', 'tag'];

    public function contacts()
    {
        return $this->belongsTo('App\Contact');
    }
}
