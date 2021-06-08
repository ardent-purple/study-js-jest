let counter = 0
beforeEach(() => {
  counter += 1
})
afterEach(() => {
  counter += 1
})

test('assert counter always odd', () => {
  expect(counter % 2 === 1).toBeTruthy()
  expect(counter).toBe(1)
})

// increasing closure counter with each test by 2
test('counter 3', () => {
  expect(counter).toBe(3)
})

test('counter 5', () => {
  expect(counter).toBe(5)
})

// beforeAll
const arr = [] // пример подготовки состояния -- создание массива
// тут могло бы быть поключение к БД или другому сервису в реальной задаче
const n = 5
const fillArray = () => {
  for (let i = 0; i < n; i++) {
    arr.push(Math.random())
  }
}

const emptyArray = () => {
  while (arr.length) {
    arr.pop()
  }
}

let core = 0
beforeAll(() => {
  core += 1
  fillArray()
})

afterAll(() => {
  emptyArray()
})

test('where are n elements in the array', () => {
  expect(arr).toHaveLength(n)
  expect(core).toBe(1)
})

test('each arr element should be less than 1', () => {
  for (const item of arr) {
    expect(item).toBeLessThan(1)
  }
  expect(core).toBe(1) // core is defined ONCE
})
