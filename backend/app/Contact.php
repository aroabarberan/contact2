<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['user', 'avatar', 'name', 'favourite'];


    // public function phones() {
    //     return $this->hasMany('App\Phone');
    // }

}
