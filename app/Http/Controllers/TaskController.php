<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // GET /api/tasks - Show all tasks for the logged-in user
    public function index(Request $request)
    {
        return response()->json($request->user()->tasks()->latest()->get());
    }

    // POST /api/tasks - Create a new task
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'due_date' => 'required|date',
            'priority' => 'required|in:Low,Medium,High',
            'status' => 'in:Pending,Completed',
        ]);

        $task = $request->user()->tasks()->create($validated);

        return response()->json($task, 201);
    }

    // GET /api/tasks/{id} - Show a single task
    public function show(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($task);
    }

    // PUT/PATCH /api/tasks/{id} - Update a task
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'subject' => 'sometimes|string|max:255',
            'due_date' => 'sometimes|date',
            'priority' => 'sometimes|in:Low,Medium,High',
            'status' => 'sometimes|in:Pending,Completed',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    // DELETE /api/tasks/{id} - Delete a task
    public function destroy(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
