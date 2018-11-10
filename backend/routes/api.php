<?php

use Illuminate\Http\Request;
use App\Contact;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/contacts', function (Request $request) {
    if ($request['sub'] !== null) {
        $results = DB::select('select * from contacts where user = :user', ['user' => $request['sub']]);
        return response()->json($results);
    }
})->middleware('jwt');


Route::post('/addContacts', function(Request $request) {
    $contact = new Contact;
    $contact->user = $request['sub'];
    $contact->name = $request['name'];
    $contact->avatar = $request['avatar'];
    $contact->phone = $request['phone'];
    $contact->favourite = $request['favourite'];
    $contact->save();

    return response()->json([
        'code' => 201,
        'status' => 'The contact is created successfully',
        'contact' => DB::select('select * from contacts order by created_at desc')[0],
    ], 201);
})->middleware('jwt');

Route::put('/contacts/{id}', function(Request $request, $id) {
    $contact = Contact::find($id);
    $contact->update($request->all());
});

Route::delete('/contacts/{id}', function($id) {
    Contact::find($id)->delete();
})->middleware('jwt');

