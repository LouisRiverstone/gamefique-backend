import { BaseCommand } from '@adonisjs/core/build/standalone'
import Faker from "faker"


export default class GenerateFakeData extends BaseCommand {

  /**
   * Command name is used to run the command
   */
  public static commandName = 'generate:fake_data'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Gera dados falsos para simulação da plataforma'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }


  public async run() {

    const { UserFactory } = await (import('Database/factories'))

    await UserFactory.createMany(2);

    await UserFactory.with('posts', Faker.datatype.number(3), (post) => {
      post.apply('published')
      post.with('comments', Faker.datatype.number(5))
      post.with('like', Faker.datatype.number(10))
      post.with('class_plan', 1, (class_plan) => {
        class_plan.with('activities', Faker.datatype.number(5) || 1)
        class_plan.with('resources', Faker.datatype.number(3) || 1)
        class_plan.with('strategies', Faker.datatype.number(3) || 1)
        class_plan.with('objectives', Faker.datatype.number(3) || 1)
      })
    }).createMany(5)
  }
}
