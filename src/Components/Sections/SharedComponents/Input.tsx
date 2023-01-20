import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface InputProps {
    title: string;
    isError: boolean;
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = (props: InputProps) => {
    const { isError, onChangeInput, title } = props
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography sx={{ color: 'text.secondary' }}>{title}</Typography>
            <TextField
            error={isError}
            required
            id="outlined-required"
            label={isError ? 'שגיאה' : "נחוץ"}
            helperText={isError ? 'יכול להכיל רק ספרות' : `הכנס בספרות בלבד`}
            placeholder='מ״ר'
            onChange={onChangeInput}
            />
        </Box>
    )
}