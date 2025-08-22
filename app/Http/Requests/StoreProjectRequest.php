<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'owner_id'    => 'required|exists:users,id',
            'status'      => 'required|in:pending,in_progress,completed',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'       => 'Project name is required.',
            'owner_id.required'   => 'Please select an owner.',
            'owner_id.exists'     => 'The selected owner does not exist.',
            'status.in'           => 'Status must be one of: pending, in progress, or completed.',
        ];
    }
}
