<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('jobs', [JobsController::class, 'index']);
Route::post('jobs', [JobsController::class, 'store']);
Route::post('jobs/{id}/approve', [JobsController::class, 'approve']);
Route::post('jobs/{id}/spam', [JobsController::class, 'markAsSpam']);
Route::get('fetchNewJobs', [JobsController::class, 'fetchNewJobs']);