import LoginForm from "./login-form";

//Server component for SSR
export default function Loginpage() {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen text-black "
      style={{ backgroundColor: "#e8f2f1" }}
    >
      <LoginForm title="Sign in to MflixX" />
    </div>
  );
}
