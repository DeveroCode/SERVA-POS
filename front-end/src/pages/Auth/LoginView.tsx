import LoginForm from "@/forms/LoginForm";

export default function LoginView() {
  return (
    <div className="space-y-2">
     <LoginForm/>


     <section>
        <button className="bg-gray-200 transition-colors duration-75 hover:bg-orange-600 cursor-pointer text-white font-bold px-4 rounded w-full py-2 my-4">Sign In</button>

        <p className="text-center text-gray-400">Or</p>

        <div>
            <button className="border border-gray-300 shadow cursor-pointer capitalize px-4 rounded-md w-full py-2 my-4 flex items-center justify-center gap-2">
                <img src="/logos/google.webp" alt="google logo" className="w-4" />
                sign in with google
            </button>
            <button className="border border-gray-300 shadow cursor-pointer capitalize px-4 rounded-md w-full py-2 my-4 flex items-center justify-center gap-2">
                <img src="/logos/apple.svg" alt="apple logo" className="w-4" />
                sign in with apple
            </button>
        </div>
     </section>
    </div>
  );
}
