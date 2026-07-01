export default function LoginForm() {
  return (
    <div className="space-y-6">
      <fieldset className="flex flex-col">
        <label htmlFor="email" className="font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input-form"
          placeholder="Type your email"
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="password" className="font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input-form"
          placeholder="Type your password"
        />
      </fieldset>
    </div>
  );
}
