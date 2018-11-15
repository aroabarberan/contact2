<?php

use Illuminate\Http\Request;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\GroupController;

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

Route::resource('contacts', 'ContactController')->middleware('jwt');
Route::resource('groups', 'GroupsController')->middleware('jwt');
