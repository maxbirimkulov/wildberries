import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Table} from "react-bootstrap";
import {FormatDate} from "../../formatDate";

const Home = () => {
    const [products, setProducts] = useState([])
    const [date, setDate] = useState('')

    let today = new Date(Date.now()- 86400000)


    const key = 'ZTQzZjA0ZDUtZTkwZS00MDRjLTg0YjAtYTljYTBmYmVlYTg5'

    useEffect(() => {
        axios(`https://suppliers-stats.wildberries.ru/api/v1/supplier/sales?dateFrom=${date.length ? date : today.toISOString().slice(0, 10)}&limit=20&key=${key}`)
            .then(({data}) => setProducts(data.filter((item, idx)=> data.map(el => el.nmId).indexOf(item.nmId) === idx ).map((item) => {
                    return {...item,
                        quantity : data.filter(el => el.nmId === item.nmId).reduce((acc, rec) => acc + rec.quantity ,item.quantity),
                        totalPrice:  data.filter(el => el.nmId === item.nmId).reduce((acc, rec) => acc + rec.totalPrice ,item.totalPrice)
                    }
                }))

            )
            .catch((err) =>  console.log(err))
    },[])

    console.log('products', products)

    return (
        <section className='home'>
           <div className="container">
                <div className='home__top'>
                    <label className='home__label'>
                        Выберите дату
                        <input className='home__date' type="date"/>
                    </label>


                    <ul className='home__list'>
                        <li className='home__item'>
                            За последний день
                        </li>
                        <li className='home__item'>
                            За последнюю неделю
                        </li>
                        <li className='home__item'>
                            За последний месяц
                        </li>
                    </ul>
                </div>


               <Table striped bordered hover variant="dark">
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
                        products && products.map((item) => (
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

           </div>
        </section>
    );
};

export default Home;