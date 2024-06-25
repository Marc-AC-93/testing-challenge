import { faker } from '@faker-js/faker';

export class RandomData {
    public randomName(): string{
        return  faker.person.fullName();
    }

    public randomTitle(): string {
        return faker.lorem.sentence( {min: 3, max: 10})
    }

    public randomDate(): string {
        return new Date().toISOString()
    }

    public randomNumber(): string {
        return faker.number.int().toString()
    }

    public randomPrice(): string {
        return faker.number.float({max: 100}).toString()
    }

    public randomLongText(): string {
        return faker.lorem.sentence({min: 101, max: 200})
    }
}