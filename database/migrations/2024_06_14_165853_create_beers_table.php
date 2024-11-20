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
        Schema::create('beers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('name')->unique();
            $table->string('color')->nullable();
            $table->float('graduation')->nullable();
            $table->string('taste')->nullable();
            $table->string('type')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('region')->nullable();
            $table->float('rating')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beers');
    }
};
