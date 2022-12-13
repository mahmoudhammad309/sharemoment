import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { AiOutlineLogin } from 'react-icons/ai';
import logo from '../assets/logo.png';
import { categories } from '../utils/data';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extraBold border-r-2 border-black transition-all duration-200 ease-in-out capitalize';
const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ user, closeToggle }) => {
  console.log({ user });
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className='min-w-210 flex flex-col justify-between bg-white h-full overflow-y-scroll  hide-scrollbar '>
      <div className='flex flex-col w-full'>
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190  items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          {!user && (
            <Link
              to='/login'
              style={{ backgroundColor: 'green' }}
              className='  ml-5 text-lg font-bold hover:text hover:translate-x-4 rounded-full w-10 p-2'
            >
              <AiOutlineLogin
                style={{ color: '#fff' }}
                fontSize={21}
                className='rounded-full'
              />
            </Link>
          )}
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className='mt-2 px-5  text-base 2xl:text-xl'>
            Discover category
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => {
            return (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={category.name}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-8 h-8 rounded-full shadow-sm'
                />
                {category.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user?._id}`}
          className='flex items-center my-5 mb-3 gap-2 p2 bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.image}
            className='w-10 h-10 rounded-full'
            alt='user-profile'
          />
          <p>{user?.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
