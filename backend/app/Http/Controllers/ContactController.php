<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Contact;
use App\Phone;
use App\Note;
use App\Email;

class ContactController extends Controller
{

    public function index()
    {
        $contacts = Contact::with(['phones', 'groups', 'notes', 'emails'])
            ->where('user', \Auth0::jwtUser()->sub)->get();

        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        $contact = $this->createContactWithEverything($request);

        if (!$contact) {
            return response()->json('', 400);
        }

        return response()->json([
            'code' => 201,
            'status' => 'The contact is created successfully',
            'contact' => $contact,
        ], 201);
    }

    public function show($id)
    {
        $contact = Contact::find($id);
        if (!$contact) return response('Error. Contact not found', 404);
        return response()->json([
            'status' => 200,
            'message' => 'contact found',
            'contact' => $contact
            ]);
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        $contact = Contact::find($id);
        $contact->delete();
        $contact = $this->createContactWithEverything($request, $id);
        if (!$contact) {
            DB::rollBack();
            return response()->json('', 400);
        }
        DB::commit();

        return response()->json([
            'code' => 200,
            'status' => 'Updated',
            'contact' => $contact,
        ], 200);
    }

    public function destroy($id)
    {
        $contact = contact::find($id);
        if ($contact->user !=  \Auth0::jwtUser()->sub) return response('Error. This user is invalid', 500);
        if ($contact == '') return response('Error. Contact not found', 404);
        $contact->delete();
        return response()->json([
            'code' => 204,
            'status' => 'The contact is update successfully',
            'contact' => $contact
        ], 204);
    }

    private function createContactWithEverything(Request $request, $id = null)
    {
        try {
            $contact = new Contact;
            $contact->user = \Auth0::jwtUser()->sub;
            $contact->last_name = $request['last_name'];
            $contact->name = $request['name'];
            $contact->favourite = $request['favourite'];
            if ($id) {
                $contact->id = $id;
            }

            $contact->save();

            if (!$request->phones) $request->phones = [];
            if (!$request->emails) $request->emails = [];
            if (!$request->notes) $request->notes = [];

            foreach ($request->phones as $key => $phoneData) {
                $phone = new Phone($phoneData);
                $phone->contact_id = $contact->id;
                $phone->save();
            }
            foreach ($request->emails as $key => $emailData) {
                $phone = new Email($emailData);
                $phone->contact_id = $contact->id;
                $phone->save();
            }
            foreach ($request->notes as $key => $noteData) {
                $phone = new Note($noteData);
                $phone->contact_id = $contact->id;
                $phone->save();
            }

            $contact->phones;
            $contact->emails;
            $contact->notes;

            return $contact;
        } catch (\Exception $exception) {
            return false;
        }
    }
}
