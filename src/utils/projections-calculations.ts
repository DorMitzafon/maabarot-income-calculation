import { HouseProjectionPricePerMeter, HOUSE_PROJECTION_THRESHOLD, RESIDENCE_TAX } from '../constants';
import { RootState } from '../store';

export const projectionsCalculation = (info: RootState) => {
    const { houseSize } = info.infrastructure;
    const metersBelowThreshold = Math.min(houseSize, HOUSE_PROJECTION_THRESHOLD);
    const metersAboveThreshold = Math.abs(houseSize - metersBelowThreshold);

    return {
        residenceTax: RESIDENCE_TAX,
        projection: metersBelowThreshold * HouseProjectionPricePerMeter.High + 
            metersAboveThreshold * HouseProjectionPricePerMeter.Low,
    }

}