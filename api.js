// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
const personalKey = 'aleksey-ivanov';/*/ "aleksey-ivanov";/*/
const baseHost = "https://wedev-api.sky.pro";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('Нет авторизации');
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// страница юзера
export function getUserPosts({ token, id }) {
  return fetch(postsHost + `/user-posts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('Нет авторизации');
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}


// лайк!!
export function likeUser({ token, id }) {
  return fetch(postsHost + `/${id}/like`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      isLiked: true,
    })
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Авторизуйтесь');
    }
    return response.json();
  })
  .catch((error) => {
    console.log(error.message);
    alert(error.message)
  });
}


// Дизлайк!!
export function dislikeUser({ token, id}) {
  return fetch(postsHost + `/${id}/dislike`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      isLiked: false,
    }),
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Авторизуйтесь');
    }
    return response.json();
  })
  .catch((error) => {
    console.log(error.message);
    alert(error.message)
  });
}

// Регистрация пользователя
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + '/api/user', {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Такой пользователь уже существует');
    }
    return response.json();
  });
}

// Отправка POST данных на API при добавлении нового коммента
export function postSending({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + '/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверный логин или пароль');
    }
    return response.json();
  });
}

export function addPost({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append('file', file);

  return fetch(baseHost + '/api/upload/image', {
    method: 'POST',
    body: data,
  }).then((response) => {
    return response.json();
  });
}

