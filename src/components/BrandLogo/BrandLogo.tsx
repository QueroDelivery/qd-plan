import { useNavigate } from 'react-router-dom';
import logo from 'src/assets/quero_logo_roxo_v.webp';

const BrandLogo = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')}>
      <img src={logo} alt="brand logo" />
    </button>
  );
};

export { BrandLogo };
