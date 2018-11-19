<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Phone;
use App\JwtUser;

class PhoneController extends Controller
{

    public function index()
    {    
        // $user = \Auth0::jwtUser();
        return response()->json(Group::all());
    }

    public function store(Request $request)
    {

    }

    public function show($id)
    {
        $phone = Phone::find($id);
        if ($phone == '') return response('Error. Phone not found', 404);
        return response()->json([
            'status' => 200,
            'message' => 'Phone found',
            'phone' => $phone
            ]);
    }

    public function update(Request $request, $id)
    {
      
    }

    public function destroy($id)
    {
        $phone = Phone::find($id);
        if ($phone == '') return response('Error. Phone not found', 404);
        $phone->delete();
        return response()->json([
            'code' => 200,
            'status' => 'The phone is update successfully',
            'phone' => $phone
        ], 201);
    }
}
