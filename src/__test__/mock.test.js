const { default: axios } = require('axios')
const User = require('../../User')

// тестируемая мокой функция
const forEach = (items, cb) => {
  for (let i = 0; i < items.length; i++) {
    cb(items[i])
  }
}

test('testing mock foreach', () => {
  // создание моки
  const mockCb = jest.fn((x) => 1 + x)
  forEach([0, 1, 2], mockCb)

  // последующие проверки моки
  // вызов моки был трижды
  expect(mockCb.mock.calls.length).toBe(3)

  // проверка аргументов вызова моки -- первый вызов, первый аргумент
  expect(mockCb.mock.calls[0][0]).toBe(0)

  // третий вызов, первый аргумент
  expect(mockCb.mock.calls[2][0]).toBe(2)

  // возвратом второго вызова было 2
  expect(mockCb.mock.results[1].value).toBe(2)
})

test('test instances', () => {
  const mocka = jest.fn(function () {
    return this.a
  })

  const o1 = { a: 1 }
  const o2 = { a: 'str' }
  const o3 = { b: true }

  const bound1 = mocka.bind(o1)
  const bound2 = mocka.bind(o2)
  const bound3 = mocka.bind(o3)

  bound1()
  bound2()
  bound3()

  expect(mocka.mock.calls.length).toEqual(3)
  expect(mocka.mock.results[1].value).toEqual('str')
  expect(mocka.mock.instances[2].a).toBeUndefined()
})

test('mock return', () => {
  const mocka = jest.fn()
  expect(mocka()).toBeUndefined()

  mocka
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('say')
    .mockReturnValueOnce(true)
    .mockReturnValue('b')

  expect(mocka()).toEqual(10)
  expect(mocka()).toEqual('say')
  expect(mocka()).toEqual(true)

  expect(mocka()).toEqual('b')
  expect(mocka()).toEqual('b')
  expect(mocka()).toEqual('b')
})

// мока модуля axios
// это полезно, если не хочется запускать громоздкий API, а тестировать прямо сейчас
jest.mock('axios')

test('should fetch users', () => {
  const users = [{ name: 'Bob' }]
  const resp = { data: users }
  axios.get.mockResolvedValue(resp) // эмулирует значение, полученное из промиса модуля
  // можно также использовать mockImplementation
  // asios.get.mockImplementation(() => Promise.resolve(resp))

  const user = new User()
  return user.all().then((data) => expect(data).toEqual(users))
})

// подстановка нужных нам реализаций
test('mock implementation', () => {
  const someFn = (x) => 1 + x
  // тест без моки
  expect(someFn(2)).toEqual(3)

  const mocka = jest
    .fn(someFn) // делаем моку на тестируемую функцию
    .mockImplementation((y) => y - 3)
  expect(mocka(3)).toEqual(0)

  // делаем разовые моки
  mocka
    .mockImplementationOnce((r) => 'one' + r)
    .mockImplementationOnce((t) => t + true)
  expect(mocka('e')).toEqual('onee')
  expect(mocka(0)).toEqual(1)

  // закончились варианты на одно тестирование, возвращаемся к моке
  expect(mocka(6)).toEqual(3)
})
