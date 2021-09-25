import React , { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { HiUserAdd } from "react-icons/hi";

import { ProSidebar } from "react-pro-sidebar";
import '../../components/sidenavstyle.css';
import { NavLink } from 'react-router-dom';

const MOHSideNav = ({...props}) => {
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const [menuCollapse, setMenuCollapse] = useState(false);

    const toggleIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const collapseHandler = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    let list=document.querySelectorAll('.list');
    for (let i=0; i<list.length; i++){
        list[i].onclick=function(){
            let j=0;
            while (j< list.length){
                list[j++].className='list';
            }
            list[i].className='list active';
        }
    }

    return (
        <ProSidebar collapsed={menuCollapse}>
            <div class="toggle" onClick={toggleIconClick}>
                {menuCollapse ? (
                    <BsList color="#fff" size={30}/>
                ) : (
                    <BsX color="#fff" size={30}/>
                )}
            </div>
            <ul>
                <li className={`list ${props.from==='home' && 'active'}`}>

                    <b></b>
                    <b></b>
                    <NavLink exact to="/moh/home" className='a' onClick={collapseHandler} >
                        <span class="icon"><BsFillHouseDoorFill size={18}/></span>
                        <span class="title">Dashboard</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='cas' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/moh/register" className='a' onClick={collapseHandler}>
                        <span class="icon"><HiUserAdd size={18}/></span>
                        <span class="title">Create User</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#" className="a" onClick={(e) => submitHandler(e)}>
                        <span class="icon"><BsPower size={18}/></span>
                        <span class="title">Log Out</span>
                    </NavLink>
                </li>
            </ul>
        </ProSidebar>
    )
}

export default MOHSideNav;