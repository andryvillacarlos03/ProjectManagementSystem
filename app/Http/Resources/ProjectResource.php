<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            "name" => $this->name,
            "description" => $this->description,
            "slug" => $this->slug,
            "owner_id" => $this->whenLoaded('assignOwner', function (){
                return [
                "id" => $this->assignOwner->id,
                "name" => $this->assignOwner->name,
                ];
            }),
            "status" => $this->status
        ];
    }
}
