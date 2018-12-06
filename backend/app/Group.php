<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
  protected $fillable = ['user', 'name'];
  

  public function contacts()
    {
        return $this->belongsToMany('App\Contact')->withTimestamps();
    }

}
