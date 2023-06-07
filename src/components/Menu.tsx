import React, { useEffect } from 'react';
import { getMenu } from '../store/Reducers/GetMenu';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { useAppSelector } from '../Hooks/useAppSelector';
import axios from 'axios';
import { API, ORDERAPI } from '../API/API';
import { workingError } from '../store/Reducers/BeginSlice';

const Menu = () => {

    const dispatch = useAppDispatch()
    const { error, loader, menu, dark, order } = useAppSelector(s => s.BeginSlice)


    // const deleteMenuBlock = async (id: number) => {
    //     try{
    //         await axios.delete(`${API}/${id}`)
    //         dispatch(getMenu())
    //     }catch(e: any){
    //         dispatch(workingError(e.message))
    //     }
    // }

    const sendOrden = async (id: number) => {
        try{
            if (menu.filter(el => el.id === id)){
                await axios.post(ORDERAPI, menu.find(el => el.id === id) )
            }
        }catch(e: any){
            dispatch(workingError(e.message))
            setTimeout(() => {dispatch(workingError(""))},2000)
        }

    }



    useEffect(() => {
        dispatch(getMenu())
    }, [])
    return (
        <div style={{
            background: dark ? "#95B9C9": "#c9a595"
        }} className='flex flex-col'>
            <h1 className='font-light text-2xl text-center pt-4'>MENU</h1>
            <div className={`bg-[${dark ? "#95B9C9" : "#c9a595"}] h-[88vh] py-6 flex justify-center items-start flex-wrap`}>
                {loader && <p>loading...</p>}
                {error &&  <p>{error}</p>}
                {
                    menu.map(el => (
                        <div className='p-2 m-4 rounded w-[300px] bg-blue-500 '>
                            <img src={el.file} alt="" />
                            <h3 className='text-xl'>{el.name}</h3>
                            <div className='flex justify-between items-center py-2'>
                                <h4>{el.price}$</h4>
                                <button onClick={() => sendOrden(el.id)} className='bg-red-400 rounded-[5px] py-2 px-4'>to order</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Menu;