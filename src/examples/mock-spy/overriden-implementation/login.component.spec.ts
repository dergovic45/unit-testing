import { LoginComponent } from "../login.component";
import { AuthService } from "../auth.service";

class MockAuthService extends AuthService {
  authenticated = false;

  isUserLoggedIn(): boolean {
    return this.authenticated;
  }
}

describe("Login Component - FAKE Authentication Service - extend real implementation", () => {
  let component: LoginComponent;
  let service: MockAuthService;

  beforeEach(() => {
    service = new MockAuthService();
    component = new LoginComponent(service);
  });

  it("should return true when the user has been authenticated", () => {
    service.authenticated = true;

    const result = component.isUserLoggedIn();

    expect(result).toBe(true);
  });

  it("should return false when the user has been authenticated", () => {
    service.authenticated = false;

    const result = component.isUserLoggedIn();

    expect(result).toBe(false);
  });
});
