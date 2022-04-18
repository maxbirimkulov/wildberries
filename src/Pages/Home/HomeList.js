import React from 'react';

const HomeList = ({item, setArticle, article}) => {

    const changeSelect = (title) => {
        setArticle(article.map((el) => {
            if (el.name === title){
                return {...el, select: !el.select}
            } else {
                return el
            }
    }))}

    return (
        <li className='home__dropdown-item'>
            <input checked={item.select} className='home__dropdown-item-input' type="checkbox" onChange={() => changeSelect(item.name)}
/>
            <span className='home__dropdown-item-text'>{item.name}</span>
        </li>
    );
};

export default HomeList;