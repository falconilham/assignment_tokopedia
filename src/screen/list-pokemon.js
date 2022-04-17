import { useState } from 'react'
import { Box, Paper, Input, Container } from '@mui/material';
import { Text, Image } from '../component/core-ui'
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../query';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    box: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gridGap: 10,
        backgroundColor: 'primary.dark',
        padding: 10,
        textAlign: 'center'
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

function ListPokemon() {
    const { myPokemon } = useSelector(state => state.myPokemon);
    const navigate = useNavigate();
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const { loading, data, fetchMore } = useQuery(GET_POKEMONS, {
        variables: {
            limit: 10,
            offset: 0
        },
        notifyOnNetworkStatusChange: true,
    });

    const getMoreData = () => {
        fetchMore({
            variables: {
                offset: data.pokemons.results.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    pokemons: {
                        ...fetchMoreResult.pokemons,
                        results: [...prev.pokemons.results, ...fetchMoreResult.pokemons.results]
                    }
                });
            }
        });
    }
    const { results } = data?.pokemons || {}
    const filteredResults = results?.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
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
                {filteredResults?.map(({ id, image, name }) => {
                    const ownedPokemon = myPokemon?.filter(({ id_original }) => id_original === id);
                    return (
                        <Paper elevation={3} onClick={() => navigate(`/pokemon-detail/${name}`)} className={classes.paper} key={id}>
                            <Image src={image} alt={name} />
                            <Text>{name}</Text>
                            {ownedPokemon?.length > 0 && <Text>{`Owned ${ownedPokemon.length}`}</Text>}
                        </Paper>
                    )
                })}
            </Box>
            <LoadingButton
                loading={loading}
                variant="contained"
                className={classes.button}
                onClick={getMoreData}
                loadingPosition="center"
            >
                Get More
            </LoadingButton>
        </Container>
    )
}



export default ListPokemon