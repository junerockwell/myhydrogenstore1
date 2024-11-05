export async function loader({context}) {}

export default function Login() {
  return (
    <div>
      <form>
        <input type="email" placeholder="email" />
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
