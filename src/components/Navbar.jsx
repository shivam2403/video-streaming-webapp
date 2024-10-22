import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { logo } from '../utils/constants'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <Stack direction="row" alignItems='center' p={2} zIndex={999} sx={{position:'sticky', top:0, background:'#000', justifyContent:'space-between'}}>
        <Link to='/' style={{display:'flex', alignItems:'center'}}>
            <img src='./logo.svg' alt="logo" height={45} style={{marginLeft:"0.5rem"}} />
        </Link>
        <SearchBar/>
    </Stack>
  )
}

export default Navbar