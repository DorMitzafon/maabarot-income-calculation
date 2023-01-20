import * as React from 'react';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { Divider, IconButton, Tooltip } from '@mui/material';

interface ControlAmountProps {
    addTitle: string;
    removeTitle: string;
    onAddClick: () => void;
    onRemoveClick: () => void;
}

export const ControlAmount = (props: ControlAmountProps) => {
    const {addTitle, removeTitle, onAddClick, onRemoveClick} = props
    return (
        <>
          <Tooltip title={addTitle} sx={{direction: 'rtl'}} onClick={onAddClick}>
            <IconButton>
              <Add />
            </IconButton>
          </Tooltip>
          <Divider></Divider>
          <Tooltip title={removeTitle} sx={{direction: 'rtl'}} onClick={onRemoveClick}>
            <IconButton>
              <Remove />
            </IconButton>
          </Tooltip>
        </>
    )
}