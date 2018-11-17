<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
Use \DB;


class GroupController extends Controller
{

    public function store(Request $request)
    {
        $group = new Group;
        $group->user = $request['sub'];
        $group->name = $request['name'];
        $group->save();
        // Check if save
        return response()->json([
            'code' => 201,
            'status' => 'The group is created successfully',
            'group' => $group,
        ], 201);
    }

    public function show($sub)
    {
        if ($sub !== null) {
            $results = DB::select('select * from groups where user = :user', ['user' => $sub]);
            return response()->json($results);
        }
    }

    public function update(Request $request, $id)
    {
        $group = group::find($id);
        $group->update($request->all());
        // check
        return response()->json([
            'code' => 204,
            'status' => 'The group is update successfully',
            'group' => $group
        ], 201);
    }

    public function destroy($id)
    {
        Group::find($id)->delete();
    }
}
