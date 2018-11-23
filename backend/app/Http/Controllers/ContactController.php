<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;
use App\JwtUser;

class ContactController extends Controller
{

    public function index()
    {
        $contacts = JwtUser::get()->contacts;
        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        $path =  $request->file('avatar')->store('images');
     
        $contact = new Contact;
        $contact->user = \Auth0::jwtUser()->sub;
        $contact->name = $request['name'];
        $contact->avatar = $path;
        $contact->phone = $request['phone'];
        $contact->favourite = $request['favourite'];
       
        if ($contact->save()) return response('Error. Contact not found', 404);
        return response()->json([
            'code' => 201,
            'status' => 'The contact is created successfully',
            'contact' => $contact,
        ], 201);
    }

    public function show($id)
    {
        $contact = Contact::find($id);
        if ($contact == '') return response('Error. Contact not found', 404);
        return response()->json([
            'status' => 200,
            'message' => 'contact found',
            'contact' => $contact
            ]);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        if ($contact == '') return response('Error. Contact not found', 404);
        $contact->update($request->all());
        return response()->json([
            'code' => 204,
            'status' => 'The contact is update successfully',
            'contact' => $contact,
        ], 201);
    }

    public function destroy($id)
    {
        $contact = contact::find($id);
        if ($contact == '') return response('Error. Contact not found', 404);
        $contact->delete();
        return response()->json([
            'code' => 200,
            'status' => 'The contact is update successfully',
            'contact' => $contact
        ], 201);
    }
}
