import logo from 'src/assets/quero_logo_branco_v.webp';
import { LoginForm } from './components/LoginForm';

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-14 items-center justify-center bg-purple-500 pt-10 min-[640px]:p-0">
      <img src={logo} alt="logo" width={200} />
      <span className="text-3xl font-semibold text-white">Plan</span>
      <div className="w-full max-w-[40rem] px-6 py-10 bg-white rounded-2xl h-full min-[640px]:h-auto rounded-b-none min-[640px]:rounded-2xl">
        <div className="w-full flex justify-center mb-3">
          <span className="font-medium text-2xl text-purple-500">Login</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export { LoginPage };
