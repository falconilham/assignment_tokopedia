import { useState } from 'react'
import { AppBar, Container, Toolbar, Box, IconButton, Button, SwipeableDrawer, ListItem, ListItemText, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles';

const pages = [
    {
        title: 'List Pokemon',
        path: '/',
    },
    {
        title: 'My Pokemon',
        path: '/my-pokemon',
    }
];

const useStyles = makeStyles(() => ({
    list: {
        padding: '0px 20px',
        width: 250,
        color: '#1976d2',
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [drawer, setDrawer] = useState(false);
    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar>
                    <SwipeableDrawer
                        anchor='left'
                        open={drawer}
                        onClose={() => setDrawer(false)}
                        onOpen={() => setDrawer(true)}
                    >
                        <List className={classes.list}>
                            {pages.map(({ title, path }, i) => (
                                <ListItem
                                    key={i}
                                    button
                                    onClick={() => {
                                        navigate(path)
                                        setDrawer(false)
                                    }}
                                >
                                    <ListItemText primary={title} />
                                </ListItem>
                            ))}
                        </List>
                    </SwipeableDrawer>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={() => setDrawer(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({ title, path }) => (
                            <Button
                                key={title}
                                onClick={() => navigate(path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}