import Typography from "@mui/material/Typography"
import { mobileAndTabletCheck } from '../../utils/mobile-detection';

interface TitleProps {
    title: string;
}

export const Title = (props: TitleProps) => {
    const { title } = props;
    return (
        <Typography variant={mobileAndTabletCheck() ? 'h4': 'h3'} gutterBottom sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center', textAlign: 'center' }} >
            {title}
        </Typography>
    )
}