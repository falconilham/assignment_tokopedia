
import { CircularProgress, Box } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <CircularProgress />
        </Box>
    )
}