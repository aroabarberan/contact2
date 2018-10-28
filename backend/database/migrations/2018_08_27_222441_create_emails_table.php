<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contact')->unsigned();
            $table->integer('tag')->unsigned();
            $table->string('title');
            $table->string('email');
        });

        Schema::table('emails', function($table) {
            $table->foreign('contact')->references('id')->on('contacts');
            $table->foreign('tag')->references('id')->on('email_tags');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('emails');
    }
}
