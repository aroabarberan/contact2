<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Phone;
use App\JwtUser;

class PhoneController extends Controller
{

    public function index()
    {    
        $phones = JwtUser::get()->phones;
        return response()->json($phones);
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
        $phone = Phone::find($id);
        if ($phone == '') return response('Error. Phone not found', 404);
        $phone->update($request->all());
        return response()->json([
            'code' => 204,
            'status' => 'The phone is update successfully',
            'phone' => $phone
        ], 201);
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
