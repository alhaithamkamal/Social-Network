<?php

use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'body' => $faker->$faker->text(),
        'user_id' => $faker->randomNumber([1-10]),
        'commentable_id' => $faker->randomNumber([1-10]),
        'commentable_tupe' => 'App\Post',
        'created_at' => now(),
        'updated_at' => now(),
    ];
});
