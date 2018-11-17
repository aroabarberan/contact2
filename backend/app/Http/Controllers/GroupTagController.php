<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GroupTagController extends Controller
{
    public function store(Request $request)
    {
        $group = new GroupTag;
        $group->tag = 'Family';
        $group->save();
        $group->tag = 'Work';
        $group->save();
        $group->tag = 'Gym';
        $group->save();
        $group->tag = 'Dance';
        $group->save();
        $group->tag = 'Work';
        $group->save();
        $group->tag = 'Friend';
        $group->save();
        $group->tag = 'Cousins';
        $group->save();
        $group->tag = 'Aunts';
        $group->save();
    }
}
