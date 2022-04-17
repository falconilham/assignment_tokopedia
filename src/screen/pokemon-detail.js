import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMON } from '../query';
import { Paper, Button } from '@mui/material';
import { Div, Text, Image } from '../component/core-ui';
import Loading from '../component/loading';
import CardType from '../component/card-type';
import { makeStyles } from '@mui/styles';
import { catchPokemon as getPokemon, firstLetterUpperCase } from "../helper";
import { dispatchOpenModal } from "../redux/slices/modal";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'grid',
        gridGap: 10,
        padding: '1.2rem',
        textAlign: 'center',
        alignItems: 'center',
    },
    containerInformation: {
        display: 'grid',
        gridGap: 20,
    },
    contentWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyContent: 'center',
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        }
    },
    information: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: 10,
        backgroundColor: '#30a7d7 !important',
    },
    informationItem: {
        padding: '0.5rem',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxWidth: '100%',
        justifySelf: 'center',
    },
    button: {
        position: 'absolute',
        // ''
    },
    field: {
        color: '#fff',
    },
    value: {
        color: '#black',
    },
    types: {
        textAlign: 'left',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        alignItems: 'center',
        justifyContent: 'center',
        gridGap: 10,
    },
    textField: {
        textAlign: 'left',
        marginBottom: '20px !important',
    }
}))

function PokemonDetail() {
    const classes = useStyles();
    const { myPokemon } = useSelector(state => state.myPokemon);
    const params = useParams();
    const { loading, data } = useQuery(GET_POKEMON, {
        variables: {
            name: params.name
        }
    })
    const catchPokemon = (pokemon) => {
        const result = getPokemon(pokemon);
        if (result.status === 'success') {
            const newPokemon = {
                ...result.pokemon,
                id: myPokemon.length + 1,
                id_original: result.pokemon.id
            }
            dispatchOpenModal({
                open: true,
                title: 'Success catch pokemon, please rename Pokemon',
                type: 'setName',
                data: newPokemon
            })
        } else {
            dispatchOpenModal({
                open: true,
                title: 'Error',
                message: result.message,
                type: 'error'
            })
        }
    }
    if (loading) return <Loading />
    const { name, moves, types, sprites, abilities, height, weight } = data?.pokemon;
    //There is Duplicate data in the data.pokemon.abilities
    const uniqueAbility = [...new Set(abilities.map(({ ability }) => ability.name))]
    //There is Duplicate data in the data.pokemon.type
    const uniqueType = [...new Set(types.map(({ type }) => type.name))]
    return (
        <Div className={classes.container}>
            <Text variant="h2">{firstLetterUpperCase(name)}</Text>
            <Div className={classes.contentWrapper}>
                <Image src={sprites?.front_default} className={classes.image} alt={name} />
                <Div className={classes.containerInformation}>
                    <Paper className={classes.information}>
                        <Div className={classes.informationItem}>
                            <Text className={classes.field}>Height</Text>
                            <Text className={classes.value}>{height}</Text>
                        </Div>
                        <Div className={classes.informationItem}>
                            <Text className={classes.field}>Weight</Text>
                            <Text className={classes.value}>{weight}</Text>
                        </Div>
                        <Div className={classes.informationItem}>
                            <Text className={classes.field}>Abilities</Text>
                            {uniqueAbility.map(item => (
                                <Text className={classes.value} key={item}>{firstLetterUpperCase(item)}</Text>
                            ))}
                        </Div>
                    </Paper>
                    <Div>
                        <Text variant="h5" className={classes.textField}>Types</Text>
                        <Div className={classes.types}>
                            {uniqueType.map(item => (
                                <CardType key={item} type={item} />
                            ))}
                        </Div>
                    </Div>
                    <Div>
                        <Text variant="h5" className={classes.textField}>Moves</Text>
                        <Div className={classes.types}>
                            {moves.map(({ move }, i) => (
                                <Text key={i}>{firstLetterUpperCase(move.name)}</Text>
                            ))}
                        </Div>
                    </Div>
                </Div>
            </Div>
            <Button
                className={classes.button}
                onClick={() => catchPokemon(data?.pokemon)}
                variant="outlined"
            >
                Catch
            </Button>
        </Div>
    )
}

export default PokemonDetail