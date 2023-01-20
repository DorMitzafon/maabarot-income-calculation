import * as React from 'react';
import { IncomeSection } from './Sections/Income';
import { FamilySection } from './Sections/Family';
import { InfrastructureSection } from './Sections/Infrastructure';

export default function Sections() {
  return (
    <div>
      <IncomeSection />
      <FamilySection />
      <InfrastructureSection />
    </div>
  );
}