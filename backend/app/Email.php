<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $fillable = ['email'];

    public function contacts()
    {
        return $this->belongsTo('App\Contact');
    }
}
