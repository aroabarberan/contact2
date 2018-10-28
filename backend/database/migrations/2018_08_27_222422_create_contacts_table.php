<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user')->unsigned();
            $table->integer('profile_image')->unsigned();
            $table->integer('country')->unsigned();
            $table->integer('province')->unsigned();
            $table->string('name');
            $table->string('second_name');
            $table->string('last_name');
            $table->string('nick_name');
            $table->date('birthdate');
            $table->string('workstation');
            $table->string('company');
            $table->string('postal_code');
            $table->string('city');
            $table->boolean('favourite');
        });

        Schema::table('contacts', function($table) {
            $table->foreign('user')->references('id')->on('users');
            $table->foreign('profile_image')->references('id')->on('images');
            $table->foreign('country')->references('id')->on('countries');
            $table->foreign('province')->references('id')->on('provinces');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
