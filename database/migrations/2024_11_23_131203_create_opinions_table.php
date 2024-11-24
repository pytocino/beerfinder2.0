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
        Schema::create('opinions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(); // Nombre del usuario (opcional)
            $table->string('email')->nullable(); // Email del usuario (opcional)
            $table->text('message'); // Opinión o mensaje
            $table->unsignedTinyInteger('rating')->nullable(); // Puntuación (1-5, por ejemplo)
            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opinions');
    }
};
