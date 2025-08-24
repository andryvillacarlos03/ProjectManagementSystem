<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

       protected $fillable = [
        'project_id',
        'assigned_to',
        'title',
        'description',
        'status',
        'due_date',
        'slug',
    ];


    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    protected static function booted()
    {
       static::creating(function ($task){
        if(empty($task->slug)){
            $baseSlug = Str::slug($task->title);
            $slug = $baseSlug;
            $counter = 1;

            while (Task::where('slug',$slug)->exists()){
               $slug = "{$baseSlug}-{$counter}";
               $counter++;  
            }
          $task->slug = $slug;
        }
       });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
