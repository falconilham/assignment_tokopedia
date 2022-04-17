import { Box, Paper, Input, Container } from '@mui/material';
import { useSelector } from 'react-redux'
import { makeStyles } from '@mui/styles';
import { useState } from 'react'

const useStyles = makeStyles(() => ({
    box: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gridGap: 10,
        backgroundColor: 'primary.dark',
        padding: 10
    },
    input: {
        marginBottom: 10,
        padding: 10
    },
    paper: {
        display: 'grid',
        padding: '1.2rem',
        justifyContent: 'center',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: 'black',
            opacity: [0.9, 0.8, 0.7],
            color: 'white'
        },
    },
    button: {
        position: 'absolute',
        bottom: 3,
        width: '100%',
    }
}))

function MyListPokemon() {
    const classes = useStyles()
    const [search, setSearch] = useState('');
    const { myPokemon } = useSelector(state => state.myPokemon);
    const filteredResults = myPokemon?.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
    return (
        <Container>
            <Input
                className={classes.input}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Pokemon"
            />
            <Box className={classes.box}>
                {filteredResults?.map(({ id, sprites, name, nickName }, i) => (
                    <Paper elevation={3} className={classes.paper} key={i}>
                        <img src={sprites.front_default} alt={name} />
                        <p>{nickName || name}</p>
                    </Paper>
                ))}
            </Box>
        </Container>
    )
}

export default MyListPokemon