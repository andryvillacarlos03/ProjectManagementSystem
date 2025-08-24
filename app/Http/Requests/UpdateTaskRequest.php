<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateTaskRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed'])],
            'due_date' => 'nullable|date|after_or_equal:today',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
        ];
    }

    /**
     * Optional: Custom messages for validation errors
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The task title is required.',
            'project_id.required' => 'Please select a project.',
            'project_id.exists' => 'The selected project does not exist.',
            'assigned_to.exists' => 'The selected user does not exist.',
            'status.in' => 'Invalid status selected.',
            'due_date.after_or_equal' => 'The due date cannot be in the past.',
        ];
    }
}
