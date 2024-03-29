<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct() 
    {
        $this->middleware('can:checkUser,task')->only([
            'updateDone','update','destroy'
        ]);
    }

    /**
     * Display a listing of the resource.
     *Task一覧
     * @return Task[]|\Illuminate\Support\Collection
     */
    public function index()
    {
        //
        return Task::where('user_id',Auth::id())->orderByDesc('id')->get();
        //return Task::orderByDesc('id')->get();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\TaskRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TaskRequest $request)
    {
        //
        $request->merge([
            'user_id' => Auth::id()
        ]);

        $task = Task::create($request->all());
        
        return $task ? response()->json($task,201) : response()->json([],500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\TaskRequest  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TaskRequest $request, Task $task)
    {
        //
        $task->title = $request->title;

        return $task->update() ? response()->json($task) : response()->json([],500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Task $task)
    {
        //
        return $task->delete() ? response()->json($task) : response()->json([],500);
    }

    //\Requestになっているところをエラーが出たのでTaskRequestに変更している
    public function updateDone (Task $task, Request $request)
    {
        //abort(500);

        $task->is_done = $request->is_done;

        return $task->update() ?  response()->json($task) : response()->json([],500);
    }
}
