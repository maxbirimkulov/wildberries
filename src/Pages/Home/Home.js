import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table, Button} from "react-bootstrap";
import {FormatDate} from "../../formatDate";
import preloader from './preloader.gif'

const Home = () => {
    const [products, setProducts] = useState([])
    const [date, setDate] = useState(new Date(Date.now() - 86400000).toISOString())
    const [time, setTime] = useState(1)

    let threeMonth = new Date(Date.now()- 2592000000 * 3)


    const key = 'ZTQzZjA0ZDUtZTkwZS00MDRjLTg0YjAtYTljYTBmYmVlYTg5'

    useEffect(() => {
        axios(`https://suppliers-stats.wildberries.ru/api/v1/supplier/sales?dateFrom=${threeMonth.toISOString().slice(0, 10)}&limit=20&key=${key}`)
            .then(({data}) => setProducts(data.filter((item, idx)=> data.map(el => el.nmId).indexOf(item.nmId) === idx ).map((item) => {
                    return {...item,
                        quantity : data.filter(el => el.nmId === item.nmId).reduce((acc, rec) => acc + rec.quantity ,item.quantity),
                        totalPrice:  data.filter(el => el.nmId === item.nmId).reduce((acc, rec) => acc + rec.totalPrice ,item.totalPrice)
                    }
                }))
            )
            .catch((err) =>  setProducts('error'))
    },[])



    return (
        <section className='home'>
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
                  : products.length ?  <Table striped bordered hover variant="dark">
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
                               if (date.length) {
                                   return Date.parse(item.date) > Date.parse(date)
                               } else {
                                   return item
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
                   </Table> :  <div>
                       <h2 className='home__title'>Подождите немного, данные загружаются !</h2>
                       <img className='home__img' src={preloader} alt="preloader"/>
                   </div>


               }


           </div>
        </section>
    );
};

export default Home;