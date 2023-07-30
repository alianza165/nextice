'use client'

import axios from 'axios';

export default axios.create({
    baseURL: "https://www.instockventory.com/",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})
