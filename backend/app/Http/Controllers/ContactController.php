<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;
Use \DB;

class ContactController extends Controller
{

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

    public function show($sub)
    {
        if ($sub !== null) {
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
