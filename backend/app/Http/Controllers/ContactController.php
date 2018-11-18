<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;
use App\Group;
use App\JwtUser;
Use \DB;

class ContactController extends Controller
{

    // public function index()
    // {
    //     $user = \Auth0::jwtUser();
    //     $groups = Group::where('user', $user->sub)->get();
    //     return response()->json($groups);
    // }

    public function index()
    {
        $groups = JwtUser::get()->groups;
        return response()->json($groups);
    }

    public function store(Request $request)
    {
        $path =  $request->file('avatar')->store('images');
        $contact = new Contact;
        $contact->user = $request['sub'];
        $contact->name = $request['name'];
        $contact->avatar = $path;
        $contact->phone = $request['phone'];
        $contact->favourite = $request['favourite'];
        $contact->save();
        // Check if save
        return response()->json([
            'code' => 201,
            'status' => 'The contact is created successfully',
            'contact' => $contact,
        ], 201);
    }

    public function show($id)
    {
        if ($sub !== null) {
            Contact::
            $results = DB::select('select * from contacts where user = :user', ['user' => $sub]);
            return response()->json($results);
        }
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        $contact->update($request->all());
        // check update
        return response()->json([
            'code' => 204,
            'status' => 'The contact is update successfully',
            'contact' => $contact,
        ], 201);
    }

    public function destroy($id)
    {
        Contact::find($id)->delete();
    }
}
