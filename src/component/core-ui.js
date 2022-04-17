import { Typography } from '@mui/material';

export function Div({ children, ...props }) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}

export function Text({ children, link, ...props }) {
    if (link) {
        return (
            <Typography style={{ cursor: 'pointer' }} {...props}>
                {children}
            </Typography>
        )

    } else {
        return (
            <Typography {...props}>
                {children}
            </Typography>
        )
    }

}

export function Image({ src, alt, classes, name, ...props }) {
    return (
        <img src={src} alt={name} {...props} />
    )
}