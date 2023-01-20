import Typography from "@mui/material/Typography"

interface TitleProps {
    subtitle: string;
}

export const Subtitle = (props: TitleProps) => {
    const { subtitle } = props;
    return (
        <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center', textAlign: 'center' }} >
            {subtitle}
        </Typography>
    )
}