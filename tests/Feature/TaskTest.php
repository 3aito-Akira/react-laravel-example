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
        //dd($tasks);
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
        $response->assertStatus(201);
    }
}
