<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'subject',
        'due_date',
        'priority',
        'status',
    ];

    // A task belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}