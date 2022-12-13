import React from 'react';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { client } from '../client';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  return (
    <main className="flex justify-start items-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          autoPlay
          controls={false}
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay">
          <div className="p-5">
            <img width="330px" src={logo} alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decode = jwt_decode(credentialResponse.credential);
                localStorage.setItem('user', JSON.stringify(decode));
                const { name, sub, picture } = decode;
                const user = {
                  _id: sub,
                  _type: 'user',
                  userName: name,
                  image: picture,
                };
                client.createIfNotExists(user).then(() => {
                  navigate('/', { replace: true });
                });
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
