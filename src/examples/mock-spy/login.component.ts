import { AuthService } from "./auth.service";

export class LoginComponent {
  authService: AuthService;

  constructor(service: AuthService) {
    this.authService = service;
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
}

const authService = new AuthService();
const login = new LoginComponent(authService);
console.log("Is user logged in:", login.isUserLoggedIn());
