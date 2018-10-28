<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contact')->unsigned();
            $table->integer('tag')->unsigned();
            $table->string('title');
            $table->string('description');
        });

        Schema::table('events', function($table) {
            $table->foreign('contact')->references('id')->on('contacts');
            $table->foreign('tag')->references('id')->on('event_tags');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
