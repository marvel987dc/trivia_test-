import logo from '/src/Logo/logo.png';

const Logo = () => {
  return (
    <div>
      <div className='logoContainer'>
           <img className='logo' src={logo} alt="logo test" />
      </div>
    </div>
  )
}

export default Logo;
