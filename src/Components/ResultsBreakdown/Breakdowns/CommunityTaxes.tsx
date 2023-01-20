import * as React from 'react';
import { store } from '../../../store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { communityTaxesCalculation } from '../../../utils/community-taxes';
import { ExpandableUnit } from '../ExpandableUnit';
import { COMMUNITY_TAXES } from '../../../constants';


export const CommunityTaxes = () => {
    const state = store.getState();
    const communityTaxes = communityTaxesCalculation(state);
    const displayCommunityTaxes = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Typography variant='body1'>{`מחושב לפי ${COMMUNITY_TAXES} לכל חבר`}</Typography>
                </Box>       
            </>
        )
    }

    return (
        <>
            <ExpandableUnit title='מיסי קהילה' displayNumber={communityTaxes.taxes * -1} >
                {displayCommunityTaxes()}
            </ExpandableUnit>
        </>
    );
}