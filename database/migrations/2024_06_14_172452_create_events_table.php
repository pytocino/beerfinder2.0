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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->enum('event_type', ['visit', 'login', 'logout', 'error', 'custom_event']);
            $table->date('event_date');
            $table->time('event_time');
            $table->string('previous_url')->nullable();
            $table->string('ip_address');
            $table->text('additional_info')->nullable(); // Campo para información adicional sobre el evento
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
