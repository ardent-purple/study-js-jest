// вспомогательные функции
const someCb = () => {
  console.log('hello i am a callback')
}

const asyncCb = (cb) => {
  cb && cb(Math.random() * 10)
}

const asyncPromise = async () => {
  return Math.random() * 100
}

const asyncPromiseReject = async () => {
  throw 2
}

const asyncPromiseMightFail = () => {
  return new Promise((res, rej) => {
    const num = Math.random() * 10
    if (num > 5) res(num)
    else rej(num)
  })
}

test('async callbacks', (done) => {
  const testingCb = (data) => {
    try {
      expect(data).toBeDefined()
      expect(data).toBeLessThan(10)
      done() // вызов этой функции сообщает о выполнении коллбека
    } catch (err) {
      done(err)
    }
  }
  asyncCb(testingCb)
})

test('async promises', () => {
  return asyncPromise().then((data) => {
    expect(data).toBeGreaterThanOrEqual(0)
  })
})

test('async promises catch', () => {
  expect.assertions(1)
  return asyncPromiseMightFail()
    .then((num) => expect(num).toBeGreaterThan(5))
    .catch((num) => expect(num).toBeLessThanOrEqual(5))
})

test('async .resolve', () => {
  return expect(asyncPromise()).resolves.toBeLessThan(100)
})

test('async .rejects', () => {
  return expect(asyncPromiseReject()).rejects.toBe(2)
})

test('async await', async () => {
  expect.assertions(1)
  try {
    const result = await asyncPromiseMightFail()
    expect(result).toBeGreaterThan(5)
  } catch (err) {
    expect(err).toBeLessThanOrEqual(5)
  }
})
