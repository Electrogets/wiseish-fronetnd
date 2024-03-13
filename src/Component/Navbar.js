import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import './navbar.css';

export default function Navbar() {

  const [show, setShow] = useState(false);
  const [width, setWidth] = useState(1000)
  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [window.innerWidth])
  return (
    <>
      {width > 768 ? (
        <div
          className="header-parent"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className='logo-admin'>
            <Link to="/">
              <img className='logothe-wise-owl' style={{ width: '86px', height: '60px' }} src='img/wiseowl.png' />
            </Link>
          </div>
          <div className="link-container" style={{ display: 'flex' }} >
            <div className="navbar-link-admin">
              <Link to='/sales'>SALES REGISTRATION</Link>
            </div>
            <div className="navbar-link-admin">
              <Link to='/customerreview'>CUSTOMER REVIEW</Link>
            </div>
            <div className="navbar-link-admin">
              <Link to='/dashboard'>DASHBOARD</Link>
            </div>
          </div>
        </div>
      ) : (
        <div>

          <div className="mobile-navbar-container">
            <div>
              <Link to="/">
                <img className='logothe-wise-owl' style={{ width: '86px', height: '60px' }} src='img/wiseowl.png' />
              </Link>
            </div>

            <div className="toggle-mobile-nav" onClick={handleClick}>
              <div style={{ textAlign: 'end' }}> <GiHamburgerMenu className="toggle-icon-mob" /> </div>
              {show && < div>
                <div style={{ textAlign: 'end' }}>
                  <Link to='/sales'>SALES REGISTRATION</Link>
                </div>
                <div style={{ textAlign: 'end' }}>
                  <Link to='/customerreview'>CUSTOMER REVIEW</Link>
                </div>
                <div style={{ textAlign: 'end' }}>
                  <Link to='/dashboard'>DASHBOARD</Link>
                </div>
              </div>}

            </div>

          </div>

        </div>
      )}
    </>
  );
}