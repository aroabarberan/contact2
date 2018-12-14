<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'user',
        'last_name',
        'name',
        'favourite',
        'second_name',
        'second_last_name',
        'direction',
        'city',
        'province',
        'job',
        'nickname',
        'id',
    ];

    public function phones() {
        return $this->hasMany('App\Phone');
    }

    public function emails() {
        return $this->hasMany('App\Email');
    }

    public function notes() {
        return $this->hasMany('App\Note');
    }

    public function groups()
    {
        return $this->belongsToMany('App\Group')->withTimestamps();
    }

}
