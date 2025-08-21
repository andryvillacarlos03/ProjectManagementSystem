<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // ✅ Allow all authenticated users for now
        // You can later add authorization logic if needed
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
            'project_id'   => 'required|exists:projects,id',
            'assigned_to'  => 'nullable|exists:users,id',
            'title'        => 'required|string|max:255',
            'description'  => 'nullable|string',
            'status'       => 'required|in:pending,in_progress,completed',
            'due_date'     => 'nullable|date|after_or_equal:today',
        ];
    }

    /**
     * Custom messages (optional but recommended).
     */
    public function messages(): array
    {
        return [
            'project_id.required' => 'A project is required.',
            'project_id.exists'   => 'The selected project does not exist.',
            'assigned_to.exists'  => 'The selected user does not exist.',
            'title.required'      => 'The task must have a title.',
            'status.in'           => 'Status must be one of: pending, in progress, or completed.',
            'due_date.date'       => 'Due date must be a valid date.',
            'due_date.after_or_equal' => 'Due date cannot be in the past.',
        ];
    }
}
