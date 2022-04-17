import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Slide, DialogContentText, DialogActions, Input, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { dispatchCloseModal, dispatchOpenModal } from '../redux/slices/modal'
import { addData } from '../redux/slices/myPokemon';

const useStyles = makeStyles(() => ({
    w50: {
        width: '50%'
    }
}));


function ModalComponent() {
    const { open, title, message, type, data } = useSelector(state => state.modal)
    const classes = useStyles();
    const [modalState, setModalState] = useState({
        loading: false,
        pokemonName: '',
    })
    const { loading, pokemonName } = modalState;
    const setPokemonName = (value) => setModalState({ ...modalState, pokemonName: value })
    const submitDialog = async () => {
        const newPokemon = {
            nickName: pokemonName,
            ...data,
        }
        addData(newPokemon)
        dispatchCloseModal()
        dispatchOpenModal({
            open: true,
            title: 'Success',
            message: 'Success catch pokemon',
            type: 'success',
        })
        setPokemonName('')
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Slide}
            style={styles.dialog}
            onClose={() => dispatchCloseModal()}
        >
            <Container maxWidth='md'>
                <DialogTitle>{title}</DialogTitle>
                {type === 'setName' ? (
                    <Input value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} fullWidth placeholder='Rename Pokemon' />
                ) : (
                    <DialogContent sx={styles.content}>
                        <DialogContentText>
                            {message}
                        </DialogContentText>
                    </DialogContent>
                )}
                {type === 'setName' && (
                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <LoadingButton
                            variant='outlined'
                            className={classes.w50}
                            onClick={() => submitDialog('e')}
                            loading={loading}
                        >
                            Save
                        </LoadingButton>
                    </DialogActions>
                )}
            </Container>
        </Dialog>
    )
}

const styles = {
    dialog: {
        height: 300,
        alignItems: 'center',
        textAlign: 'center'
    },
    content: {
        padding: '50px 50px !important',
        minWidth: 300,
        textAlign: 'center',
    }
}
export default ModalComponent