import Typography from "@mui/material/Typography"

interface TitleProps {
    title: string;
}

export const Title = (props: TitleProps) => {
    const { title } = props;
    return (
        <Typography variant="h3" gutterBottom sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center', textAlign: 'center' }} >
            {title}
        </Typography>
    )
}