// authStore.js
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { api } from "../api/api";
import { header } from "./header";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
    this.checkLoggedIn(); // Проверка статуса авторизации при загрузке приложения
  }

  loggedIn = false;
  user = null;
  error = null;

  async login(email, password) {
    try {
      const response = await axios.post(`${api}/login`, { email, password });
      this.setUser(response.data.user);

      // Сохраняем токен при успешном входе в localStorage
      localStorage.setItem("access", response.data.access_token);
      localStorage.setItem("refresh", response.data.refresh_token);
    } catch (error) {
      console.error(e.message);
    }
  }

  async register(email, password, firstname, lastname, phone, group) {
    try {
      const response = await axios.post(`${api}/register`, {
        email,
        password,
        firstname,
        lastname,
        phone,
        group,
      });
      this.setUser(response.data.user);

      // Сохраняем токен при успешной регистрации в localStorage
      localStorage.setItem("access", response.data.access_token);
      localStorage.setItem("refresh", response.data.refresh_token);
    } catch (error) {
      console.error(e.message);
    }
  }
  async refreshToken() {
      try {
        const refreshToken = localStorage.getItem("refresh");
        
        // Проверяем, существует ли токен обновления
        if (!refreshToken) {
          throw new Error('Отсутствует токен обновления');
        }
    
        const response = await axios.post(`${api}/activate/refresh/token`, {
          refresh: refreshToken,
          
        },header);
    
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;
    
        localStorage.setItem("access", newAccessToken);
        localStorage.setItem("refresh", newRefreshToken);
    
        return newAccessToken;
      } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
        throw error;
      }
    } 

  setUser(user) {
    this.user = user;
    this.loggedIn = !!user;
    this.error = null;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("loggedIn", "true");
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("loggedIn");
    }
  }

  setError(errorMessage) {
    this.error = errorMessage;
  }

  checkLoggedIn() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      this.loggedIn = true;
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }

  get isLoggedIn() {
    return this.loggedIn;
  }
}

const authStore = new AuthStore();

// Проверка каждую минуту и обновление токена, если он устарел
// setInterval(() => {
//   if (authStore.loggedIn) {
//     authStore.refreshToken();
//   }
// }, 60000); // 60000 миллисекунд = 1 минута

export default authStore;



// 