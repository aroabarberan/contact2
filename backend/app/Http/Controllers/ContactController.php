<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contact;
Use \DB;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $path = $request->file('avatar')->store('images');


        $contact = new Contact;
        $contact->user = $request['sub'];
        $contact->name = $request['name'];
        $contact->avatar = $path;
        $contact->phone = $request['phone'];
        $contact->favourite = $request['favourite'];
        $contact->save();
        // Comprobar si se ha guardado y devolver el estado segun
        return response()->json([
            'code' => 201,
            'status' => 'The contact is created successfully',
            'contact' => $contact,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($sub)
    {
        if ($sub !== null) {
            $results = DB::select('select * from contacts where user = :user', ['user' => $sub]);
            return response()->json($results);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        $contact->update($request->all());
        // comprobar
        return response()->json([
            'code' => 204,
            'status' => 'The contact is update successfully',
            'contact' => DB::select('select * from contacts order by created_at desc')[0],
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Contact::find($id)->delete();
    }
}
