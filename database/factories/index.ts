import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'
import School from 'App/Models/School'
import FormationCourse from 'App/Models/FormationCourse'
import FormationInstitute from 'App/Models/FormationInstitute'
import ClassPlan from 'App/Models/ClassPlan'
import ClassPlanActivity from 'App/Models/ClassPlanActivity'
import ClassPlanObjective from 'App/Models/ClassPlanObjective'
import ClassPlanResource from 'App/Models/ClassPlanResource'
import ClassPlanStrategy from 'App/Models/ClassPlanStrategy'
import Tag from 'App/Models/Tag'
import Faker from "faker/locale/pt_BR"
import Comment from 'App/Models/Comment'
import Like from 'App/Models/Like'


export const LikeFactory = Factory
    .define(Like, async ({ faker }) => {
        const users = await User.all()
        const user = faker.random.arrayElement(users)

        return {
            user_id: user.id,
        }
    })
    .build()


export const CommentFactory = Factory
    .define(Comment, async ({ faker }) => {
        const users = await User.all()
        const user = faker.random.arrayElement(users)

        return {
            user_id: user.id,
            comment: faker.lorem.words(faker.datatype.number(10) || 2)
        }
    })
    .build()

export const StrategyFactory = Factory
    .define(ClassPlanStrategy, ({ faker }) => {
        return {
            'description': faker.lorem.words(faker.datatype.number(5) || 2)
        }
    })
    .build()

export const ResoucesFactory = Factory
    .define(ClassPlanResource, ({ faker }) => {
        return {
            'description': faker.lorem.words(faker.datatype.number(5) || 2)
        }
    })
    .build()

export const ObjectivesFactory = Factory
    .define(ClassPlanObjective, ({ faker }) => {
        return {
            'description': faker.lorem.words(faker.datatype.number(5) || 2)
        }
    })
    .build()

export const ActivitiesFactory = Factory
    .define(ClassPlanActivity, ({ faker }) => {
        return {
            'description': faker.lorem.words(faker.datatype.number(5) || 2)
        }
    })
    .build()

export const ClassPlanFactory = Factory
    .define(ClassPlan, ({ faker }) => {
        return {
            'duration': `${faker.datatype.number(120)} minutos`,
        }
    })
    .relation('activities', () => ActivitiesFactory)
    .relation('resources', () => ResoucesFactory)
    .relation('objectives', () => ObjectivesFactory)
    .relation('strategies', () => StrategyFactory)
    .build()

export const PostFactory = Factory
    .define(Post, ({ faker }) => {
        return {
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
            temp_html: `<p style=\"text-align: justify\">${faker.lorem.paragraphs(3)}</p>`,
            school_subject_id: 1,
        }
    }).after('create', async (factory, model, ctx) => {
        const tags = await Tag.all()
        const tagsRandom = (Faker.random.arrayElements(tags, Faker.datatype.number(tags.length)))

        await model.related('tags').sync(tagsRandom.map(tag => tag.id));

        model.save();
    })
    .relation('like', () => LikeFactory)
    .relation('comments', () => CommentFactory)
    .relation('class_plan', () => ClassPlanFactory)
    .state('published', (post) => post.post_status_id = 2)
    .state('pending', (post) => post.post_status_id = 1)
    .build()


export const UserFactory = Factory
    .define(User, async ({ faker }) => {
        const schools = await School.all()
        const formationCourses = await FormationCourse.all();
        const formationInstitutes = await FormationInstitute.all();

        return {
            first_name: Faker.name.firstName(),
            last_name: Faker.name.lastName(),
            email: Faker.internet.email(),
            password: faker.internet.password(),
            school_id: (faker.random.arrayElement(schools)).id,
            formation_courses_id: (faker.random.arrayElement(formationCourses)).id,
            formation_institutes_id: (faker.random.arrayElement(formationInstitutes)).id
        }
    })
    .relation('posts', () => PostFactory)
    .build()