<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\GroupController;
use App\Http\Controllers\API\PhoneController;


Route::get('/contacts', 'ContactController@index')->middleware('jwt');
Route::post('/contacts', 'ContactController@store')->middleware('jwt');
Route::get('/contacts/{id}', 'ContactController@show')->middleware('jwt');
Route::put('/contacts/{id}', 'ContactController@update')->middleware('jwt');
Route::delete('/contacts/{id}', 'ContactController@delete')->middleware('jwt');


Route::get('/groups', 'GroupController@index')->middleware('jwt');
Route::post('/groups', 'GroupController@store')->middleware('jwt');
Route::get('/groups/{id}', 'GroupController@show')->middleware('jwt');
Route::put('/groups/{id}', 'GroupController@update')->middleware('jwt');
Route::delete('/groups/{id}', 'GroupController@delete')->middleware('jwt');


Route::get('/phones', 'PhoneController@index')->middleware('jwt');
Route::post('/phones', 'PhoneController@store')->middleware('jwt');
Route::get('/phones/{id}', 'PhoneController@show')->middleware('jwt');
Route::put('/phones/{id}', 'PhoneController@update')->middleware('jwt');
Route::delete('/phones/{id}', 'PhoneController@delete')->middleware('jwt');
