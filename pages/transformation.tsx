
import axios from 'axios';
import {Button, TextField, Typography, Paper} from '@mui/material';


import React, {useState} from 'react';



const Transformation = () => {
    const [E, setE] = useState(2600000.000);
    const [N, setN] = useState(1200000.000);
    const [resultat, setResultat] = useState('');

    // async def transform(E: float = 2600000, N: float = 1200000):
    const transformation = async() => {
        try {
            const response = await axios.get(`/api/transformation`, {params: {E,N}});
            setResultat(response.data.koordinaten);
        }
        catch {
            console.log("Fehler!! API Aufruf!!");
        }
    }


    return (
    <>
        <Paper elevation={5} style={{padding: '15px', margin: '15px', maxWidth: '400px'}}>
            <Typography variant="h5">Transformation LV95 nach WGS84</Typography>
            <TextField
                label="E-Koordinate"
                value={E}
                onChange={ (e) => setE(parseInt(e.target.value))}
                fullWidth
                margin="normal"
            />
            <TextField
                label="N-Koordinate"
                value={N}
                onChange={ (e) => setN(parseInt(e.target.value))}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={transformation}>
                Transformiere
            </Button>

            {resultat && (
                <Typography variant="h6">
                    Die Koordinaten in WGS84 sind: {resultat}
                </Typography>

            )}

        </Paper>
    </>
    )
};
export default Transformation;

// if __name__ == "__main__":
//     uvicorn.run(app, host="127.0.0.1", port=8000)