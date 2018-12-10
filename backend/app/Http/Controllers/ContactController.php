<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;

class ContactController extends Controller
{

    public function index()
    {
        $contacts = Contact::where('user', \Auth0::jwtUser()->sub)->get();
        foreach ($contacts as $contact) {
            $contact->phones;
            $contact->groups;
        }
        return response()->json($contacts);
    }
    
    public function store(Request $request)
    {
        $contact = new Contact;
        $contact->user = \Auth0::jwtUser()->sub;
        $contact->lastName = $request['lastName'];
        $contact->name = $request['name'];
        $contact->favourite = $request['favourite'];
        $contact->phones;
        $contact->groups;
        $contact->save();
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
        // if ($contact->user !=  \Auth0::jwtUser()->sub) return response('Error. This user is invalid', 500);
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
        if ($contact->user !=  \Auth0::jwtUser()->sub) return response('Error. This user is invalid', 500);
        if ($contact == '') return response('Error. Contact not found', 404);
        $contact->delete();
        return response()->json([
            'code' => 200,
            'status' => 'The contact is update successfully',
            'contact' => $contact
        ], 201);
    }

}
