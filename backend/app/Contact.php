<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['user', 'last_name', 'name', 'favourite'];


    public function phones() {
        return $this->hasMany('App\Phone');
    }

    // public function emails() {
    //     return $this->hasMany('App\Email');
    // }

    // public function events() {
    //     return $this->hasMany('App\Event');
    // }

    // public function notes() {
    //     return $this->hasMany('App\Note');
    // }

    // public function websites() {
    //     return $this->hasMany('App\Website');
    // }

    public function groups()
    {
        return $this->belongsToMany('App\Group')->withTimestamps();
    }

}
