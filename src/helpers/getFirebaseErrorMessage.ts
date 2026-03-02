export default function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "Пользователь не найден";
    case "auth/wrong-password":
      return "Неверный пароль";
    case "auth/invalid-email":
      return "Неверный email";
    case "auth/too-many-requests":
      return "Слишком много попыток. Попробуйте позже";
    default:
      return "Ошибка входа";
  }
}
