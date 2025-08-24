import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function MUI() {
    const books = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
  { label: 'book1', id: 3 },
  { label: 'book3', id: 4},
];
// or

  return (
    <>
        <Autocomplete
            disablePortal
            options={books}
            sx={{ width: 500 , margin:"20px" }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
    />
      
    </>
  )
}
