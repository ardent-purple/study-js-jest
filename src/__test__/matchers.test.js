const sum = (a, b) => a + b

// матчер -- прямое равенство. Прям целое === так что для объектов не подойдет
test('adds 1 + 2 equals 3', () => {
  expect(sum(1, 2))
    // возврат особого объекта "ожидаемого", "expectation"
    // эти объекты отслеживаются jest для поимки всех зафейлившихся матчеров
    .toBe(3)
})

// Это равенство используется для объектов
test('object test toEqual', () => {
  const data = { dog: 'Bobik' }
  data['cat'] = 'Murzik'
  expect(data).toEqual({ dog: 'Bobik', cat: 'Murzik' })
})

// проверка истинности и состояний переменной/объекта
test('is null', () => {
  const n = null
  expect(n).toBeNull() // is strictly null
  expect(n).toBeDefined() // is not undefined
  expect(n).not.toBeUndefined() // is strictly undefined
  expect(n).not.toBeTruthy() // is truthy
  expect(n).toBeFalsy() // checks if this !!value === false
})

test('is undefined', () => {
  const u = undefined
  expect(u).not.toBeNull()
  expect(u).toBeUndefined()
  expect(u).toBeFalsy()
})

test('is zero', () => {
  const z = 0
  expect(z).toBeDefined()
  expect(z).toBeFalsy()
  expect(z).not.toBeNull()
})

// числовые проверки
test('number 10', () => {
  const ten = 10
  expect(ten).toBeGreaterThan(3)
  expect(ten).toBeGreaterThanOrEqual(10)
  expect(ten).toBeGreaterThanOrEqual(9.5)
  expect(ten).toBeLessThan(11)
  expect(ten).toBeLessThanOrEqual(10)
  expect(ten).toBeLessThanOrEqual(10.5)

  expect(10).toBe(10)
  expect(10).toEqual(10)
})

// для проверок чисел с плавающей точкой
// из-за неточности надо использовать toBeCloseTo
test('floating point numbers', () => {
  const val = 0.1 + 0.2
  expect(val).toBeCloseTo(0.3)
})

// для проверки строк можно использовать регулярки с помощью toMatch
// подстроки тоже подходят
test('matching strings with reqex and substrings', () => {
  expect('team').not.toMatch(/I/i)
  expect('Cris').toMatch('is')
})

// перечисляемые объекты можно проверять на содержание элемента
// с помощью toContain
test('array contains', () => {
  const arr = ['berry', 'beer', 'bread']
  expect(arr).toContain('beer')
})

test('generator contains', () => {
  const gen = function* () {
    yield 1
    yield 2
    yield 3
  }
  expect(gen()).toContain(2)
  expect(gen()).toContain(1)
  expect(gen()).not.toContain(0)
})

test('set contains', () => {
  const s = new Set(['a', 'b', 'c'])
  expect(s).toContain('b')
})

const throwsIfFalsy = (arg) => {
  if (!arg) {
    throw new Error('is falsy')
  }
  return arg
}

// ожидание выброса исключения -- toThrow
test('throwing error', () => {
  // проверка по выбросу исключения и его типа
  // нужно оборачивать в анонимную
  expect(() => throwsIfFalsy(0)).toThrow()
  expect(() => throwsIfFalsy(2)).not.toThrow()

  // проверка по сообщению ошибки проводится по подстроке или регекспу
  expect(() => throwsIfFalsy(0)).toThrow('is')
  expect(() => throwsIfFalsy(false)).toThrow(/FALSY/i)
})
