<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDefaultContacts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function($table) {
            $table->string('last_name')->default('')->change();
            $table->string('name')->default('')->change();
            $table->boolean('favourite')->default(0)->change();
            $table->string('second_name')->default('')->change();
            $table->string('second_last_name')->default('')->change();
            $table->string('nickname')->default('')->change();
            $table->string('direction')->default('')->change();
            $table->string('city')->default('')->change();
            $table->string('province')->default('')->change();
            $table->string('job')->default('')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('second_name')->nullable();
            $table->string('second_last_name')->nullable();
            $table->string('nickname')->nullable();
            $table->string('direction')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('job')->nullable();
        });
    }
}
