'use client'

import axios from 'axios';

export default axios.create({
    baseURL: "http://3.226.46.93:8000/",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})
