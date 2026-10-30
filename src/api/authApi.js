const DEMO_USER = {
  username: '230408039@st.biruni.edu.tr',
  password: 'demo123456'
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === DEMO_USER.username && password === DEMO_USER.password) {
        resolve({ username })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}
