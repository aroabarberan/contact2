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

    public function destroy($id)
    {
        $contactGroup = ContactGroup::find($id);
        if ($contactGroup == '') return response('Error. Contact Group not found', 404);
        $contactGroup->delete();
        return response()->json([
            'code' => 200,
            'status' => 'The contact group is update successfully',
            'contactgroup' => $contactGroup
        ], 201);
    }
}
