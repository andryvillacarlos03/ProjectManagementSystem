<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
   public function toArray(Request $request): array
{
    return [
        "id" => $this->id,
        "title" => $this->title,
        "description" => $this->description,
        "status" => $this->status,
        "due_date" => $this->due_date,
        "assigned_to" => $this->whenLoaded('assignedUser', function () {
            return [
               "id" => $this->assignedUser->id,
               "name" => $this->assignedUser->name,  
            ];
        }),
        "project_id" => $this->whenLoaded('project', function () {
            return [
                'id' => $this->project->id,
                'name' => $this->project->name,
            ];
        }),
        "slug" => $this->slug,
    ];
}
}
