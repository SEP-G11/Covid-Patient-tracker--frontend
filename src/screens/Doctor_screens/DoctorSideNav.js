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
import { TiDocumentAdd } from "react-icons/ti";
import { ProSidebar } from "react-pro-sidebar";
import '../../components/sidenavstyle.css';

import { NavLink } from 'react-router-dom';

const DoctorSideNav = ({...props}) => {
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
                <li className={`list ${props.from==='home' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink exact to="/doctor/home" className='a' onClick={collapseHandler}>
                        <span class="icon"><BsFillHouseDoorFill size={18}/></span>
                        <span class="title">Dashboard</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='viewPatientsList' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/patientList" className='a' onClick={collapseHandler}>
                        <span class="icon"><BsFillPersonLinesFill size={18}/></span>
                        <span class="title">Patients List</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='admit' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/admit" className='a' onClick={collapseHandler}>
                        <span class="icon"><HiUserAdd size={18}/></span>
                        <span class="title">Admit</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='createReport' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/createReport" className='a' onClick={collapseHandler}>
                        <span class="icon"><TiDocumentAdd size={18}/></span>
                        <span class="title">Create Medical Report</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='discharge' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/discharge/:id" className='a' onClick={collapseHandler}>
                        <span class="icon"><HiUserRemove size={18}/></span>
                        <span class="title">Discharge</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='transfer' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/transfer/:id" className='a' onClick={collapseHandler}>
                        <span class="icon"><BiTransfer size={18}/></span>
                        <span class="title">Transfer</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='search' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/search" className='a' onClick={collapseHandler}>
                        <span class="icon"><AiOutlineFileSearch size={18}/></span>
                        <span class="title">Search Beds</span>
                    </NavLink>
                </li>
                <li className={`list ${props.from==='enter' && 'active'}`}>
                    <b></b>
                    <b></b>
                    <NavLink to="/doctor/enter/:id" className='a' onClick={collapseHandler}>
                        <span class="icon"><CgEnter size={18}/></span>
                        <span class="title">Enter Test Results</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/" className="a" onClick={submitHandler}>
                    <span class="icon"><BsPower size={18}/></span>
                    <span class="title">Log Out</span>
                    </NavLink>
                </li>
                
            </ul>
        </ProSidebar></div>
    )
}

export default DoctorSideNav;


