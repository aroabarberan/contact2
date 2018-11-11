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
    // if($request['avatar'])
    // {
    //    $image = $request['avatar'];
    //    $position = strpos($image, ';');
    //    $name = time().'.' . explode('/', explode(':', substr($image, 0, $position))[1])[1];
    //    \Image::make($request['avatar'])->save(public_path('images/').$name);
    //  }
    $contact = new Contact;
    $contact->user = $request['sub'];
    $contact->name = $request['name'];
    // $contact->avatar = $name;
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
    return response()->json([
        'code' => 204,
        'status' => 'The contact is update successfully',
        'contact' => DB::select('select * from contacts order by created_at desc')[0],
    ], 201);
});

Route::delete('/contacts/{id}', function($id) {
    Contact::find($id)->delete();
})->middleware('jwt');

