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
    $contact->phone = $request['phone'];
    $contact->favourite = $request['favourite'];
    $contact->save();
    return "Contact created correctly";
})->middleware('jwt');

//TODO
Route::put('/contacts/{id}', function(Request $request, $id) {
    $contact = Contact::find($id);
    $contact->update($request->all());
    return "Contact updated correctly";
});

Route::delete('/contacts/{id}', function($id) {
    Contact::find($id)->delete();
    return "Contact delete correctly";
})->middleware('jwt');

