export class AuthService {
  //... some logic

  isUserLoggedIn(): boolean {
    //... some logic
    return !!localStorage.getItem("token");
  }
}
