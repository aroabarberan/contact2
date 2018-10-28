<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phones', function (Blueprint $table) {
            $table->increments('id', true);
            $table->integer('contact')->unsigned();
            $table->integer('tag')->unsigned();
            $table->integer('prefix')->unsigned();
            $table->string('number');
        });

        Schema::table('phones', function($table) {
            $table->foreign('contact')->references('id')->on('contacts');
            $table->foreign('tag')->references('id')->on('phone_tags');
            $table->foreign('prefix')->references('id')->on('prefixes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phones');
    }
}
