<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contact')->unsigned();
            $table->integer('tag')->unsigned();
            $table->string('name');
        });

        Schema::table('groups', function($table) {
            $table->foreign('contact')->references('id')->on('contacts');
            $table->foreign('tag')->references('id')->on('group_tags');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groups');
    }
}
