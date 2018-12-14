<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;
use App\Phone;

class ContactController extends Controller
{

    public function index()
    {
        $contacts = Contact::with(['phones', 'groups'])
            ->where('user', \Auth0::jwtUser()->sub)->get();

        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        $contact = new Contact;
        $contact->user = \Auth0::jwtUser()->sub;
        $contact->last_name = $request['last_name'];
        $contact->name = $request['name'];
        $contact->favourite = $request['favourite'];

        $contact->save();

        foreach ($request->phones as $key => $phoneData) {
            $phone = new Phone;
            $phone->phone = $phoneData['phone'];
            $phone->tag = $phoneData['tag'];
            $phone->contact_id = $contact->id;
            $phone->save();
        }

        $contact->phones;

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
