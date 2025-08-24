<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
    {
       $query = Task::query();

       if($request->filled('search')){
        $search = $request->input('search');
        $query->where(function ($q) use ($search){
             $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        });
       }

      if($request->filled('status') && $request->status !== 'All'){
          $query->where('status',$request->status);
       }
          
      $tasks = $query->with(['assignedUser','project'])
               ->latest()
               ->paginate(10)
               ->withQueryString();

       return Inertia('Task',[
        'tasks' => TaskResource::collection($tasks),
        'filters' => $request->only(['search','status']),
        
       ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {   
        $tasks = Task::query()->with(['assignedUser','project'])->paginate(10)->onEachSide(1);
        return Inertia('Task',[
           "tasks" => TaskResource::collection($tasks),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();
        $task = Task::create($validated);
        return redirect()->route('addTask.show')->with('success','Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('TaskEdit',[
            'task' => $task,
            'users' => User::select('id','name')->get(),
            'projects' => Project::select('id','name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $validated = $request->validated();
        $task->update($validated);
        return back()->with('success','Successfully update!!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try{
          $task->delete();
          return back()->with('sucess','Task deleted successfully');
        }catch(QueryException $e){
          return back()->with('error', $e);
        }
    }

    public function addTaskShow(){
        return Inertia('AddTask',[
            "projects" => Project::all(),
            'users' => User::all()
        ]);
    }
}
