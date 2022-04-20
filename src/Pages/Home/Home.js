import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table, Button} from "react-bootstrap";
import {FormatDate} from "../../formatDate";
import preloader from './preloader.gif'
import HomeList from "./HomeList";

const Home = () => {
    const [products, setProducts] = useState([])
    const [date, setDate] = useState(new Date(Date.now() - 86400000).toISOString())
    const [time, setTime] = useState(1)
    const [article, setArticle] = useState([])
    const [drop, setDrop] = useState(false)

    let threeMonth = new Date(Date.now()- 2592000000 * 3)

    const key = 'ZTQzZjA0ZDUtZTkwZS00MDRjLTg0YjAtYTljYTBmYmVlYTg5'

    useEffect(() => {
        axios(`https://suppliers-stats.wildberries.ru/api/v1/supplier/sales?dateFrom=${threeMonth.toISOString().slice(0, 10)}&limit=20&key=${key}`)
            .then(({data}) => {
                    setProducts(data)
                    setArticle(data.filter((item, idx)=> data.map(el => el.nmId).indexOf(item.nmId) === idx ).map(item => {
                        return {name:item.supplierArticle, select: true}
                    }))
            })
            .catch((err) =>  setProducts('error'))
    },[])


    const filterItem = (arr) => {
       return  arr.filter((item) => {
            return article.filter(el => el.select).map(el => el.name).includes(item.supplierArticle)
        }).filter((item) => {
            if (date.length) {
                return Date.parse(item.date) > Date.parse(date)
            } else {
                return item
            }
        })
    }

    return (
        <section className='home' onClick={(e) =>  {
            if (e.target.className !== 'home__right'){
                setDrop(false)
            }
        }}>
           <div className="container">
                <div className='home__top'>
                    <div  className='home__label'>
                        <label htmlFor="date">Выберите дату</label>
                        <form className='home__form' onSubmit={(e) => {
                            e.preventDefault()
                            setDate(e.target[0].value)
                            e.target[0].value = ''
                        }}>
                            <input min={`${new Date(threeMonth).toISOString().slice(0,10)}`} max={`${new Date().toISOString().slice(0, 10)}`} required id='date' className='home__date' type="date" />
                            <Button type='submit' className='home__btn' variant="primary">Получить</Button>
                        </form>
                    </div>


                    <ul className='home__list'>
                        <li className={`home__item ${time === 1 && 'home__item_active'}`} onClick={() =>{
                            setTime(1)
                            setDate(new Date(Date.now() - 86400000).toISOString())
                        }}>
                            За последний день
                        </li>
                        <li className={`home__item ${time === 7 && 'home__item_active'}`} onClick={() => {
                            setTime(7)
                            setDate(new Date(Date.now()- 86400000 * 7).toISOString())
                        }}>
                            За последнюю неделю
                        </li>
                        <li className={`home__item ${time === 30 && 'home__item_active'}`} onClick={() => {
                            setTime(30)
                            setDate(new Date(Date.now()- 86400000 * 30).toISOString())
                        } }>
                            За последний месяц
                        </li>
                    </ul>
                </div>

               {
                   products === 'error' ? <div>
                            <h2 className='home__title'>Упс, что то пошло не так... (</h2>
                            <h2 className='home__title'>Попробуйте еще раз !!!</h2>
                   </div>
                  : products.length ? <div className='home__content'>
                           <Table className='home__table' striped bordered hover variant="dark">
                               <thead>
                               <tr>
                                   <th>Дата</th>
                                   <th>Артикул</th>
                                   <th>Количество</th>
                                   <th>Общая сумма</th>
                               </tr>
                               </thead>
                               <tbody>
                               {
                                   products && products.filter((item) => {
                                       return article.filter(el => el.select).map(el => el.name).includes(item.supplierArticle)
                                   }).filter((item) => {
                                       if (date.length) {
                                           return Date.parse(item.date) > Date.parse(date)
                                       } else {
                                           return item
                                       }
                                   }).filter((item, idx,arr)=> arr.map(el => el.nmId).indexOf(item.nmId) === idx ).map((item,idx, arr) => {
                                       return {...item,
                                           quantity : filterItem(products).filter(el => el.nmId === item.nmId).reduce((acc, rec) => acc + rec.quantity ,item.quantity),
                                           totalPrice:  filterItem(products).filter(el => el.nmId === item.nmId).reduce((acc, rec) => acc + rec.totalPrice ,item.totalPrice)
                                       }
                                   }).map((item) => (
                                       <tr key={item.nmId}>
                                           <td>
                                               {FormatDate(item.date)}
                                           </td>
                                           <td>
                                               {item.supplierArticle}
                                           </td>
                                           <td>
                                               {
                                                   item.quantity
                                               }
                                           </td>
                                           <td>
                                               {
                                                   item.totalPrice
                                               }
                                           </td>
                                       </tr>
                                   ))
                               }
                               </tbody>
                           </Table>
                           <div className='home__right'>
                               <div className='home__article' onClick={(e) => {
                                   e.stopPropagation()
                                   setDrop(true)
                               } }>
                                   Артикул
                                   <div style={{display: drop ? 'flex' : 'none'}} className='home__dropdown'>
                                        <div className='home__dropdown-top'>
                                            <input className='home__dropdown-top-input' type="checkbox"/>
                                            <p className='home__dropdown-top-text'>артикул</p>
                                        </div>
                                       <div className='home__dropdown-mid'>
                                           <span className='home__dropdown-mid-icon'>
                                              <svg width="19" height="18" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" />
                                               <path d="M21 20.9999L16.65 16.6499" stroke="black"/>
                                           </svg>
                                           </span>

                                           <input className='home__dropdown-mid-input' placeholder='Введите артикул' type="search"/>
                                       </div>
                                       <ul className='home__dropdown-list'>
                                           {
                                               article.map((item) => (
                                                   <HomeList key={item.name} item={item} setArticle={setArticle} article={article}/>
                                               ))
                                           }
                                       </ul>
                                   </div>
                               </div>

                           </div>

                       </div> :  <div>
                       <h2 className='home__title'>Подождите немного, данные загружаются !</h2>
                       <img className='home__img' src={preloader} alt="preloader"/>
                   </div>


               }


           </div>
        </section>
    );
};

export default Home;