<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;	
use Illuminate\Support\Facades\DB;	

class AuthController extends Controller
{
    
	public function register (Request $request) 
	{

	    $validator = Validator::make($request->all(), [
	        'name' => 'required|string|max:255',
	        'email' => 'required|string|email|max:255|unique:users',
	        'password' => 'required|string|min:6|confirmed',
	    ]);

	    if ($validator->fails())
	    {
	        return response(['errors'=>$validator->errors()->all()], 422);
	    }

	    $request['password']=Hash::make($request['password']);
	    $user = User::create($request->toArray());

	    $token = $user->createToken('Laravel Password Grant Client')->accessToken;
	    $response = [
	    	'token' => $token,
	    	'user' => $user
		];

	    return response($response, 200);

	}

	/***/
	public function login()
	{
	    // Check if a user with the specified email exists
	    $user = User::whereEmail(request('username'))->first();

	    if (!$user) {
	        return response()->json([
	            'message' => 'Wrong email or password',
	            'status' => 422
	        ], 422);
	    }

	    // If a user with the email was found - check if the specified password
	    // belongs to this user
	    if (!Hash::check(request('password'), $user->password)) {
	        return response()->json([
	            'message' => 'Wrong email or password',
	            'status' => 422
	        ], 422);
	    }

	    // Send an internal API request to get an access token
	    $client = DB::table('oauth_clients')
	        ->where('password_client', true)
	        ->first();

	    // Make sure a Password Client exists in the DB
	    if (!$client) {
	        return response()->json([
	            'message' => 'Laravel Passport is not setup properly.',
	            'status' => 500
	        ], 500);
	    }

	    $data = [
	        'grant_type' => 'password',
	        'client_id' => $client->id,
	        'client_secret' => $client->secret,
	        'username' => request('username'),
	        'password' => request('password'),
	    ];

	    $request = Request::create('/oauth/token', 'POST', $data);

	    $response = app()->handle($request);

	    // Check if the request was successful
	    if ($response->getStatusCode() != 200) {
	        return response()->json([
	            'message' => 'Wrong email or password',
	            'status' => 422
	        ], 422);
	    }

	    // Get the data from the response
	    $data = json_decode($response->getContent());

	    // Format the final response in a desirable format
	    return response()->json([
	        'token' => $data->access_token,
	        'user' => $user,
	        'status' => 200
	    ]);
	}

	public function logout (Request $request) 
	{
	    $token = $request->user()->token();
	    $token->revoke();

	    $response = 'You have been succesfully logged out!';
	    return response($response, 200);
	}
}
