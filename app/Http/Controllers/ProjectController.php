<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
 {
    $query = Project::query();

    if ($request->filled('search')) {
        $search = $request->input('search');

        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhereHas('assignOwner', function ($owner) use ($search) {
                  $owner->where('name', 'like', "%{$search}%"); // search user name
              });
        });
    }

    if($request->filled('status') && $request->status !== 'All'){
        $query->where('status',$request->status);
    }
    
    $projects = $query->with('assignOwner')
                      ->latest()
                      ->paginate(10)
                      ->withQueryString();

    return Inertia('Project', [
        'projects' => ProjectResource::collection($projects),
        'filters'  => $request->only(['search','status']),
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    { 
      $projects = Project::query()->with('assignOwner')->paginate(10);

      return inertia('Project',[
        'projects' => ProjectResource::collection($projects)->response()->getData(true),
      ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();
        $projects = Project::create($validated);
        return redirect()->route('project.so')->with('success','Project Successfully added');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('EditProject',[
            'project' => $project,
            'owners' => User::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();
        $projects = $project->update($validated);
        return back()->with('success','Update Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        try{
         $project->delete();
         return back()->with('success','Project Deleted Successfully');
        }catch(QueryException $e){
         return back()->with('error','Something was wrong');
        }
    }

    public function projectShow(){
        return inertia('AddProject',[
            'users' => User::all(),
        ]);
    }
}
