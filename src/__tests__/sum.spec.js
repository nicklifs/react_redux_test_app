import sum, {sum2, sum3, setInitialFunc} from '../func/sum'
//var Promise = require('es6-promise').Promise;

describe('sum', () => {
    it('should add two numbers(1, 2)', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('should add two numbers(1.5, 2.6)', () => {
        expect(sum(1.5, 2.6)).toBe(4.1);
    });
});

describe('sum2', () => {
    it('should add two numbers(1, 2)', () => {
        expect(sum2(1, 2)).toBe(4);
    });

    it('should add two numbers(1.5, 2.6)', () => {
        expect(sum2(1.5, 2.6)).toBe(5.1);
    });

    it('should add two numbers(1, 2) with initial const', () => {
        // сделаем «заглушку» для функции initial, которая будет возвращать нужное нам значение
        // исключить возможную некорректную работу функции initial из нашего теста функции sum
        //initial = jest.fn((cb) => 1);
        setInitialFunc(jest.fn((cb) => 1))
        expect(sum2(1, 2)).toBe(4);
    });
});

describe('function tests', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    //not working
    it('should return 4 for arguments 1 and 2', () => {
        //initial = jest.fn((cb) => 1);
        setInitialFunc(jest.fn((cb) => 1))
        const result = sum3(1, 2);

        // not working
        result.then((result) => {
            console.log('result', result);
            expect(result).toEqual({
                fff: 222
            });
            console.log('end result', result);

            expect(initial).toHaveBeCalledWith(1);
        });

        jest.runTimersToTime(10000);

        return result;
    })

    it('test toEqual, toMatchObject - compare object', () => {
        expect({fff: 111}).toEqual({fff: 111});     // true
        expect({fff: 111}).toMatchObject({fff: 111});
    });
});