import React, { useState } from 'react';
import Logo from '@/assets/dragon.png';
import Image from 'next/image';
import ColoredHamBurger from '@/assets/burger-menu-colored.svg';
import WhiteHamBurger from '@/assets/burger-menu-white.svg';

const Navbar = ({ hasScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const downloadWallet = () => {
    window.open(
      'https://dinowallet.netlify.app/',
      '_blank' // <- This is what makes it open in a new window.
    );
  };

  return (
    <div className="w-full group h-fit fixed top-0">
      <div className="max-w-[1340px]  py-[10px]  justify-between z-10 h-[78.8px] mx-auto w-[90%] flex items-center sticky top-0">
        <div className="w-fit flex items-center">
          <Image
            src={Logo}
            alt="logo"
            width={90}
            className="w-[80px] bg-transparent"
          />
          <div className="hidden small-lg:flex pl-[20px] text-[#222]  text-[0.875rem] leading-[1.3]">
            <span className="text-[2rem] font-bold leading-10">Dino</span>
          </div>
        </div>
        <div className="hidden md:flex gap-[10px] ">
          <button className="  mr-[5px] bg-gray hover:bg-secondary-gray pt-[9px] pb-[8px] px-5 text-secondary-text text-[0.875rem] leading-[110%] font-medium rounded-[12px]">
            Talk to Sales
          </button>
          <button
            onClick={downloadWallet}
            className="bg-primary text-white mr-[5px] hover:bg-secondary hover:text-secondary-text pt-[9px] pb-[8px] px-5  text-[0.875rem] leading-[110%] font-medium rounded-[12px]">
            Download Wallet
          </button>
        </div>
        <div
          onClick={toggleMenu}
          className={`h-[62px] cursor-pointer w-[62px] flex items-center justify-center overflow-hidden small-lg:hidden rounded-[10px] ${
            isMenuOpen && 'bg-primary'
          }`}>
          <button className="">
            <Image
              src={isMenuOpen ? WhiteHamBurger : ColoredHamBurger}
              alt="logo"
              className="w-8"
            />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}

      <div
        className={`bg-white fixed top-[78.8px] translate-y-0 small-lg:hidden  ${
          !isMenuOpen && 'translate-y-[-135%]'
        }  duration-500 transition-all ease-normal w-full  py-4 h-[calc(100vh-5rem)] `}>
        <div className="w-[90%] mx-auto">
          <p className="block py-2 px-4 text-primary-text">Product</p>
          <p className="block py-2 px-4 text-primary-text">About</p>
          <p className="block py-2 px-4 text-primary-text">Features</p>
          <p className="block py-2 px-4 text-primary-text">Pricing</p>
          <div className="flex flex-col pt-[15px] small-sm:flex-row gap-[10px]">
            <button className="  mr-[5px] bg-gray hover:bg-secondary-gray pt-[9px] pb-[8px] px-5 text-secondary-text text-[0.875rem] leading-[110%] font-medium rounded-[12px]">
              Talk to Sales
            </button>
            <button className="bg-primary text-white mr-[5px] hover:bg-secondary hover:text-secondary-text pt-[9px] pb-[8px] px-5  text-[0.875rem] leading-[110%] font-medium rounded-[12px]">
              Download Wallet
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute transition-all duration-200 ${
          (hasScrolled && 'opacity-[100%]') || (isMenuOpen && 'opacity-[100%]')
        } ease-in-out top-0 opacity-0 group-hover:opacity-[100%] w-full h-[78.8px] bg-white`}></div>
    </div>
  );
};

export default Navbar;
