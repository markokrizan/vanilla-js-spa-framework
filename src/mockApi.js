class MockAPI {
    getMockData(data, delay = 2000) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              try {
                resolve(data)
              } catch (e) {
                reject(e)
              }
            }, delay)
          })
    }
}