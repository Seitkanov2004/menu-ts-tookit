import React from 'react';
import logo from "./../img/image 2.svg"
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { useAppSelector } from '../Hooks/useAppSelector';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"
import { workingDark } from '../store/Reducers/BeginSlice';



const Header = () => {

    const dispatch = useAppDispatch()
    const { dark } = useAppSelector(s => s.BeginSlice)

    console.log(dark)
    return (
        <div className='container py-[13px] flex justify-between items-center'>
            <img src={logo} alt="" />
            <div className='w-[30%] flex items-center justify-between text-xl'>
                <NavLink to="/">Menu</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </div>
            {
                dark ? <BsFillMoonStarsFill onClick={() => dispatch(workingDark(false))} /> : <BsFillSunFill onClick={() => dispatch(workingDark(true))} />
            }
        </div>
    );
};

export default Header;