import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {

  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../CitiesAndState'))
    await this.runSeeder(await import('../FormationCoursesArea'))
    await this.runSeeder(await import('../FormationCoursesLevel'))
    await this.runSeeder(await import('../FormationInstitute'))
    await this.runSeeder(await import('../FormationCourse'))
    await this.runSeeder(await import('../PostStatus'))
    await this.runSeeder(await import('../SchoolSubject'))
    await this.runSeeder(await import('../SchoolType'))
    await this.runSeeder(await import('../Tag'))
  }
}