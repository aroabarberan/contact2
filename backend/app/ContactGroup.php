<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContactGroup extends Model
{
  protected $table = 'contact_group'; 
  protected $fillable = ['contact_id', 'group_id'];
    
}
