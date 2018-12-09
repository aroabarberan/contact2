<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['title', 'description'];

    public function contacts()
    {
        return $this->belongsTo('App\Contact');
    }
}
