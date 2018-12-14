<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsContacts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function($table) {
            $table->string('second_name')->nullable();
            $table->string('second_last_name')->nullable();
            $table->string('nickname')->nullable();
            $table->string('direction')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('job')->nullable();
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
            $table->dropColumn('second_name');
            $table->dropColumn('second_last_name');
            $table->dropColumn('nickname');
            $table->dropColumn('direction');
            $table->dropColumn('city');
            $table->dropColumn('province');
            $table->dropColumn('job');
        });
    }
}
