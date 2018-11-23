<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Group;
use App\JwtUser;
Use \DB;


class GroupController extends Controller
{
    public function index() {
        $groups = JwtUser::get()->groups;
        return response()->json($groups);
    }

    public function store(Request $request)
    {
        $group = new Group;
        $group->user =\Auth0::jwtUser()->sub;
        $group->name = $request['name'];
       
        if ($group->save()) return response('Error. Group not found', 404);
        return response()->json([
            'code' => 201,
            'status' => 'The group is created successfully',
            'group' => $group,
        ], 201);
    }

    public function show($id)
    {
        $group = Group::find($id);
        if ($group == '') return response('Error. Group not found', 404);
        return response()->json([
            'status' => 200,
            'message' => 'group found',
            'group' => $group
            ]);
    }

    public function update(Request $request, $id)
    {
        $group = Group::find($id);
        if ($group == '') return response('Error. group not found', 404);
        $group->update($request->all());
        return response()->json([
            'code' => 204,
            'status' => 'The group is update successfully',
            'group' => $group
        ], 201);
    }

    public function destroy($id)
    {
        $group = Group::find($id);
        if ($group == '') return response('Error. Group not found', 404);
        $group->delete();
        return response()->json([
            'code' => 200,
            'status' => 'The Group is update successfully',
            'group' => $group
        ], 201);
    }
}
