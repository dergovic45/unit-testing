import { LoginComponent } from "../login.component";
import { AuthService } from "../auth.service";

describe("Login Component - REAL Authentication Service - SPY", () => {
  let component: LoginComponent;
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    component = new LoginComponent(service);
  });

  it("should return true when the user has been authenticated", () => {
    jest.spyOn(service, "isUserLoggedIn").mockReturnValue(true);

    const result = component.isUserLoggedIn();

    expect(result).toBeTrue();
    expect(service.isUserLoggedIn).toHaveBeenCalledTimes(1);
  });

  it("should return false when the user has been authenticated", () => {
    jest.spyOn(service, "isUserLoggedIn").mockReturnValue(false);

    const result = component.isUserLoggedIn();

    expect(result).toBeFalse();
    expect(service.isUserLoggedIn).toHaveBeenCalledTimes(1);
  });
});
