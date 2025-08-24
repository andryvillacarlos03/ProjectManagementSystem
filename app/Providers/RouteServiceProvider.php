<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Route;
class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */


public function boot(): void
{
 
    // Explicit binding for project by slug
    Route::bind('project', function ($value) {
        return Project::where('slug', $value)->firstOrFail();
    });

    Route::bind('task',function($value){
        return Task::where('slug',$value)->firstOrFail();
    });
}

}
