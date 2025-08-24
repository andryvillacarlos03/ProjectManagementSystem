<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'status',
        'slug',
    ];

    public function assignOwner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    protected static function booted()
    {
        static::creating(function ($project) {
            // Only generate slug if not already set
            if (empty($project->slug)) {
                $baseSlug = Str::slug($project->name);
                $slug = $baseSlug;
                $counter = 1;

                // Ensure unique slug
                while (Project::where('slug', $slug)->exists()) {
                    $slug = "{$baseSlug}-{$counter}";
                    $counter++;
                }

                $project->slug = $slug;
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'slug'; // Route binding will use slug instead of id
    }
}
