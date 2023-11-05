import { LoginComponent } from "../login.component";
import { AuthService } from "../auth.service";

describe("Login Component - REAL Authentication Service", () => {
  let component: LoginComponent;
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => {
    localStorage.removeItem("token");
  });

  it("should return true when the user has been authenticated", () => {
    localStorage.setItem("token", "12345");

    const result = component.isUserLoggedIn();

    expect(result).toBe(true);
  });

  it("should return false when the user has been authenticated", () => {
    const result = component.isUserLoggedIn();

    expect(result).toBe(false);
  });
});
