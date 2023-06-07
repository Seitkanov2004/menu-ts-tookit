import React, { useEffect } from 'react';
import { getOrder } from '../store/Reducers/GetMenu';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { useAppSelector } from '../Hooks/useAppSelector';
import axios from 'axios';
import { nextQuantity, prevQuantity, workingError } from '../store/Reducers/BeginSlice';
import { ORDERAPI } from '../API/API';

const Orders = () => {

    const dispatch = useAppDispatch()
    const { order } = useAppSelector(s => s.BeginSlice)

      const deleteMenuBlock = async (id: number) => {
        try{
            await axios.delete(`${ORDERAPI}/${id}`)
            dispatch(getOrder())
        }catch(e: any){
            dispatch(workingError(e.message))
        }
    }



    useEffect(() => {
        dispatch(getOrder())
    }, [])

    return (
        <div className=' container  flex flex-col items-center justify-center'>
            <h1 className='font-light text-2xl text-center py-4'>MY ORDERS</h1>
            {
                order.map(el => (
                    <div className='w-[70%] h-[130px] p-3 flex justify-between bg-blue-200 rounded-[10px] my-4'>
                        <div className='flex '>
                            <img className='h-[105px] w-[186px] mr-8 rounded-[6px]' style={{ objectFit: "cover" }} src={el.file} alt="" />
                            <div>
                                <h2 className='text-xl font-bold mb-4'>{el.name}</h2>
                                <h3>${el.price  * el.quantity}</h3>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => deleteMenuBlock(el.id)} className='bg-red-700 py-2 px-4 rounded-[5px] text-white'>delete order</button>
                            <div className='flex w-[120px] justify-between mt-6'>
                                <button onClick={() => dispatch(prevQuantity(el.id))} className='bg-yellow-400 px-4 rounded-[8px]'>-</button>
                                <h3>{el.quantity}</h3>
                                <button onClick={() => dispatch(nextQuantity(el.id))} className='bg-yellow-400 px-4 rounded-[8px]'>+</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <button className='mt-10 bg-green-700 py-2 px-8 rounded-[8px] text-white'>to order</button>
        </div>
    );
};

export default Orders;