<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('local', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('name')->unique();
            $table->string('type')->nullable();
            $table->string('description')->nullable();
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('image')->nullable();
            $table->string('address')->unique()->nullable();
            $table->float('latitude')->unique()->nullable();
            $table->float('longitude')->unique()->nullable();
            $table->string('city')->nullable();
            $table->string('region')->nullable();
            $table->string('website')->nullable();
            $table->boolean('verified')->default(false);
            $table->float('rating')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('local');
    }
};
