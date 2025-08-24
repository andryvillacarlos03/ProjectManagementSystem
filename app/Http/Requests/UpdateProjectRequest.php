<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'owner_id' => 'required|exists:users,id',
            'status' => 'required|in:pending,in_progress,completed',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Project name is required.',
            'owner_id.required' => 'Please select an owner.',
            'owner_id.exists' => 'Selected owner is invalid.',
            'status.required' => 'Status is required.',
            'status.in' => 'Status must be Pending, In Progress, or Completed.',
        ];
    }
}
