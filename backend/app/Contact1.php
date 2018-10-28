<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'id', 'user', 'profile_image', 'name', 'second_name', 'last_name', 
        'nick_name', 'birthdate', 'workstation', 'company', 'country', 
        'portal_address', 'province', 'favourite', 'city', 
    ];

}
