<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function(){

  if(Auth::check()){
     $user = Auth::user();
    if($user->role === 'admin'){
      return redirect()->route('dashboard');
    }else{
      return redirect()->route('login');
    }
   }
   return redirect()->route('login');
});

Route::middleware(['auth','verified'])->group(function(){
  Route::get('dashboard', fn()=>inertia('Dashboard'))->name('dashboard');
  
  // Project
  Route::get('project/create',[ProjectController::class,'create'])->name('project.create');
  Route::get('project',[ProjectController::class,'index'])->name('project.index');
  Route::get('project/addProject',[ProjectController::class,'projectShow'])->name('project.so');
  Route::get('project/{project}/edit',[ProjectController::class,'edit'])->name('project.edit');
  Route::post('project/addProject',[ProjectController::class,'store'])->name('projects.store');
  Route::delete('project/{project}',[ProjectController::class,'destroy'])->name('project.destroy');
  Route::put('project/{project}',[ProjectController::class,'update'])->name('project.update');

  // Task
  Route::get('tasks/create',[TaskController::class,'create'])->name('task.create');
  Route::get('task',[TaskController::class,'index'])->name('tasks.index');
  Route::post('task/addTask',[TaskController::class,'store'])->name('tasks.store');
  Route::delete('task/{task}',[TaskController::class,'destroy'])->name('tasks.destroy');
  Route::get('task/addTask',[TaskController::class,'addTaskShow'])->name('addTask.show');
  Route::get('task/{task}/edit',[TaskController::class,'edit'])->name('tasks.edit');
  Route::put('task/{task}',[TaskController::class,'update'])->name('task.update');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
