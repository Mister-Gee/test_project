import http  from './httpservice';

export const login = (data) => {
    return http.post("/post", data)
}

export const register = (data) => {
    return http.post("/post", data)
}