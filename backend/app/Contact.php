<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['user', 'lastName', 'name', 'favourite'];


    // public function phones() {
    //     return $this->hasMany('App\Phone');
    // }

}
