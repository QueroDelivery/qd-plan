import logo from 'src/assets/quero_logo_branco_v.webp';

const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-purple-500 flex justify-center items-center">
      <img src={logo} alt="logo" width={200} />
    </div>
  );
};

export { ScreenLoader };
