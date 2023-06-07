import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { useAppSelector } from '../Hooks/useAppSelector';
import { postFile, workingError } from '../store/Reducers/BeginSlice';
import axios from 'axios';
import { API } from '../API/API';
import { getMenu } from '../store/Reducers/GetMenu';

const Admin = () => {

    const handleRef = useRef<any>()
    const dispatch = useAppDispatch()

    const [edit, setEdit] = useState(false)
    const { file, menu } = useAppSelector(s => s.BeginSlice)

    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: 1,
        file: "",

    })

    const newData = {
        name: product.name,
        price: product.price,
        quantity: 1,
        file: file,

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        dispatch(postFile(fileReader.result))
    }

    const handleFile = (e: any) => dispatch(postFile(fileReader.readAsDataURL(e.target.files[0])))

    const postData = async () => {
        await axios.post(API, newData)
            .then(response => {
                dispatch(postFile(null))
                dispatch(getMenu())
                product.name = ""
                product.price = ""
            })
            .catch(error => console.log(error))
            .finally(() => console.log("end"))
    }


    const deleteMenuBlock = async (id: number) => {
        try{
            await axios.delete(`${API}/${id}`)
            dispatch(getMenu())
        }catch(e: any){
            dispatch(workingError(e.message))
        }
    }

    useEffect(() => {
        dispatch(getMenu())
    }, [])


    const { dark } = useAppSelector(s => s.BeginSlice)
    return (
        <div className='flex flex-col text-center' style={{
            background: dark ? "#95B9C9" : "#c9a595"
        }} >
            <h1 className='font-light text-2xl pt-4'>CREATE PRODUCT</h1>
            <div>
                <div className='pt-[10%] flex container justify-between items-start'>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        postData()
                    }} className='flex flex-col items-start'>
                        <button style={{
                            padding: "16px 190px 16px 24px",
                            background: "#D9D9D9",
                            borderRadius: "5px",
                        }} onClick={(e) => {
                            e.preventDefault()
                            handleRef.current.click()
                        }}>choose file</button>
                        <input accept='image/*' type="file" ref={handleRef} onChange={handleFile} style={{ display: "none" }} />
                        <input onChange={handleChange} name="name" value={product.name} style={{
                            margin: "22px 0",
                            width: "500px",
                            padding: "16px",
                            borderRadius: "5px",
                            background: "#D9D9D9"
                        }} type="text" placeholder='food name' />
                        <input onChange={handleChange} name="price" value={product.price} style={{
                            margin: "22px 0",
                            width: "500px",
                            padding: "16px",
                            borderRadius: "5px",
                            background: "#D9D9D9"
                        }} type="number" placeholder='price' />
                        <button className='py-2 px-4 bg-[#DDAA27] rounded'>create</button>
                    </form>
                    <div>
                        {
                            file ? <img src={file} alt="" style={{ objectFit: "cover" }} className='w-[477px] h-[289px] rounded-[10px]' /> : <div className='bg-[#D9D9D9] w-[477px] h-[289px] rounded-[10px] flex justify-center items-center text-3xl'>place for a photo</div>
                        }
                    </div>
                </div>
            </div>

            <div className='container'>
                {
                    menu.map(el => (
                        <div className='p-2 m-4 rounded flex items-start  justify-between  my-4 bg-blue-500 '>
                            <img src={el.file} alt="" className='w-[200px]' />
                            <div className='flex justify-between flex-col items-start py-2'>
                                {
                                    edit ? <h3 className='text-xl'>{el.name}</h3> : <input/>
                                }
                                
                                <h4>{el.price}$</h4>

                            </div>
                            <div className='flex items-start flex-col '>
                                <button onClick={() => deleteMenuBlock(el.id)}>delete</button>
                                <button>edit</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Admin;