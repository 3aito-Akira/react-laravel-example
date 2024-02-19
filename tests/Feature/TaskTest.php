<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class TaskTest extends TestCase
{
    use RefreshDatabase;
    /**
     * @test
     */
    public function test_example()
    {
        $tasks = Task::factory()->count(10)->create();
        //dd($tasks->toArray());
        $response = $this->getJson('api/tasks');
        //dd($response);
        $response->assertOk()->assertJsonCount($tasks->count());
    }

    /**
     * @test
     */
    public function test_task_store()
    {
        $data = [
            'title' => 'test投稿'
        ];
        $response = $this->postJson('api/tasks',$data);
        //dd($response->json());
        $response->assertCreated()->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function test_task_update()
    {
        $task = Task::factory()->create();
        $task->title = '書き換え後';
        //dd($task);

        $response = $this->patchJson("api/tasks/{$task->id}",$task->toArray());
        //dd($response->json());

        $response->assertOK()->assertJsonFragment($task->toArray());
    }

    /**
     * @test
     */
    public function test_task_delete()
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->deleteJson('api/tasks/1');
        $response->assertOK();

        $response = $this->getJson('api/tasks');
        $response->assertJsonCount($tasks->count() -1);

    }

    
    /**
     * @test
     */
    
    public function test_task_validate_nameIsBlank()
    {
        $data = [
            'title' => ''
        ];
        $response = $this->postJson('api/tasks',$data);
        //dd($response);
        $response->assertStatus(422)->assertJsonValidationErrors(
            ['title' => 'The title field is required.' ]
        );
    }

    /**
     * @test
     */
    
    public function test_task_validate_nameLengthIsBelow256()
    {
        $data = [
            'title' => str_repeat("a",256)
        ];
        $response = $this->postJson('api/tasks',$data);
        //dd($response->json());
        $response->assertStatus(422)->assertJsonValidationErrors(
            ['title' => 'The title must not be greater than 255 characters.' ]
        );
    }

}
