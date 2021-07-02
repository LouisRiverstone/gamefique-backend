/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(async () => {
  Route.group(async () => {

    Route.group(async () => {
      Route.post('register', 'AuthController.register')
      Route.post('login', 'AuthController.login')
      Route.get('user', 'AuthController.user')
    }).prefix('/auth');

    Route.group(async () => {
      Route.get('institute', 'FormationInstitutesController.index')
      Route.get('course', 'FormationCoursesController.index')
    }).prefix('/formation');


    Route.group(async () => {
      Route.get('/', 'SchoolsController.index')
    }).prefix('/schools');


    Route.group(async () => {
      Route.get('/', 'PostsController.index')
      Route.post('/', 'PostsController.store')
      Route.get('/:id', 'PostsController.show')
      Route.put('/:id', 'PostsController.update')
      Route.delete('/:id', 'PostsController.destroy')
    }).prefix('/posts');

    Route.group(async () => {
      Route.get('/', 'CommentsController.index')
      Route.post('/', 'CommentsController.store')
      Route.get('/:id', 'CommentsController.show')
      Route.put('/:id', 'CommentsController.update')
      Route.delete('/:id', 'CommentsController.destroy')
    }).prefix('/comment');


  }).prefix('/v1')
}).prefix('/api')
