import React , { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { BsX } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { HiUserAdd ,HiUserRemove } from "react-icons/hi";
import { CgEnter } from "react-icons/cg";
import { ProSidebar } from "react-pro-sidebar";
import '../../components/sidenavstyle.css';

import { NavLink } from 'react-router-dom';

const HospitalAdminSideNav = () => {
    const dispatch = useDispatch();

  const submitHandler = () => {    
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
        <div>

       
        <ProSidebar collapsed={menuCollapse}>
            <div class="toggle" onClick={toggleIconClick} style={{width:"50px",height:"30px"}}>
                {menuCollapse ? (
                <BsList color="#fff" size={25}/>
                ) : (
                <BsX color="#fff" size={25}/>
                )}
            </div>
          
            <ul>
                <li class="list active">
                    <b></b>
                    <b></b>
                    <NavLink exact to="/hospitalAdmin/home" className='a' onClick={collapseHandler}>
                        <span class="icon"><BsFillHouseDoorFill size={18}/></span>
                        <span class="title">Dashboard</span>
                    </NavLink>
                </li>
                <li class="list">
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/viewPatientsList" className='a' onClick={collapseHandler}>
                        <span class="icon"><BsFillPersonLinesFill size={18}/></span>
                        <span class="title">Patients List</span>
                    </NavLink>
                </li>
                <li class="list">
                    <b></b>
                    <b></b>
                    <NavLink to="/hospitalAdmin/admit" className='a' onClick={collapseHandler}>
                        <span class="icon"><HiUserAdd size={18}/></span>
                        <span class="title">Admit</span>
                    </NavLink>
                </li>
                <li class="list">
                    <b></b>
                    <b></b>
                    <NavLink to="/hospitalAdmin/discharge" className='a' onClick={collapseHandler}>
                        <span class="icon"><HiUserRemove size={18}/></span>
                        <span class="title">Discharge</span>
                    </NavLink>
                </li>
                <li class="list">
                    <b></b>
                    <b></b>
                    <NavLink to="/hospitalAdmin/transfer" className='a' onClick={collapseHandler}>
                        <span class="icon"><BiTransfer size={18}/></span>
                        <span class="title">Transfer</span>
                    </NavLink>
                </li>
                <li class="list">
                    <b></b>
                    <b></b>
                    <NavLink to="/hospitalAdmin/search" className='a' onClick={collapseHandler}>
                        <span class="icon"><AiOutlineFileSearch size={18}/></span>
                        <span class="title">Search Beds</span>
                    </NavLink>
                </li>
                <li class="list">
                    <b></b>
                    <b></b>
                    <NavLink to="/hospitalAdmin/enter" className='a' onClick={collapseHandler}>
                        <span class="icon"><CgEnter size={18}/></span>
                        <span class="title">Enter Test Results</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="#" className="a" onClick={submitHandler}>
                    <span class="icon"><BsPower size={18}/></span>
                    <span class="title">Log Out</span>
                    </NavLink>
                </li>
      
            </ul>

          
        </ProSidebar> </div>
    )
}

export default HospitalAdminSideNav;