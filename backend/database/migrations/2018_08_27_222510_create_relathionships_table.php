<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRelathionshipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relathionships', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('contact')->unsigned();
            $table->integer('tag')->unsigned();
            $table->string('name');
        });

        Schema::table('relationships', function($table) {
            $table->foreign('contact')->references('id')->on('contacts');
            $table->foreign('tag')->references('id')->on('relationship_tag');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('relathionships');
    }
}
