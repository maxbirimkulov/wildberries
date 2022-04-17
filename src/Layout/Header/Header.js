import React from 'react';
import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <header className='header'>
            <div className="container">
                <nav className='header__nav'>
                    <h1 className='header__title'>Api Wildberries</h1>

                    <ul className='header__list'>
                        <li className='header__item'>
                            <NavLink to='/' className='header__link'>Продажи</NavLink>
                        </li>
                        <li className='header__item'>
                            <NavLink to='/order' className='header__link'>Заказы</NavLink>
                        </li>
                        <li className='header__item'>
                            <NavLink to='/storage' className='header__link'>Склад</NavLink>
                        </li>
                        <li className='header__item'>
                            <NavLink to='/referals' className='header__link'>Отчет о реализации</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;