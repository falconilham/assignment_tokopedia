import InventoryImage from '../assest/inventory.png'
import { Image, Div, Text } from './core-ui'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    container: {
        display: 'grid',
        // width: '50px',
        position: 'fixed',
        top: '100px',
        right: '10px',
        cursor: 'pointer',
        justifyItems: 'center',
    },
    image: {
        maxWidth: '100%',
        width: '50px',
    }
}))

export default function Inventory() {
    const classes = useStyles()
    const navigate = useNavigate();
    return (
        <Div className={classes.container} onClick={() => navigate('/my-pokemon')}>
            <Image className={classes.image} src={InventoryImage} alt="inventory" />
            <Text>Inventory</Text>
        </Div>
    )
}