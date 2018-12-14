<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;
use App\ContactGroup;


class ContactGroupController extends Controller
{
    public function index() {
        return response()->json(ContactGroup::all());
    }

    public function store(Request $request)
    {
        $allContactGroup = ContactGroup::all();
        $exist = false;
        $contactGroup = new ContactGroup;
        $contactGroup->contact_id = $request['contactId'];
        $contactGroup->group_id = $request['groupId'];
        foreach ($allContactGroup as $cg) {
                if ($cg->contact_id == $request['contactId'] && $cg->group_id == $request['groupId']) {
                    $exist = true;
                }
        }
        if(!$exist) $contactGroup->save();

        return response()->json([
            'code' => 201,
            'status' => 'The contact group is created successfully',
            'contactgroup' => $contactGroup,
        ], 201);
    }

    public function destroy($contactID, $groupID)
    {
        $contact = Contact::with('groups')->find($contactID);

        if (\Auth0::jwtUser()->sub !== $contact->user) {
            return response()->json([
                'code' => 403,
            ], 403);
        }

        foreach ($contact->groups as $key => $group) {
            if ($group->id . "" === $groupID) {
                $result = $contact->groups()->detach($groupID);
                if ($result) {
                    return response('', 204);
                }
            }
        }

        return response()->json([
            'code' => 404,
        ], 404);
    }
}
