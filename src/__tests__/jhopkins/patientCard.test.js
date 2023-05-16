import { render, screen } from '@testing-library/react';
import PatientCardAdmin from '@/components/PatientCardAdmin';
import '@testing-library/jest-dom/extend-expect';


test('renders patient information correctly', () => {
    const name = 'John Doe';
    const dob = '1990-01-01';
    const familyHistory = 'No family history';
    const img = '/../public/favicon.ico';
    const eligibility = true;
    const id = '123'

    render(
        <PatientCardAdmin
            name={name}
            dob={dob}
            familyHistory={familyHistory}
            img={img}
            id={id}
            eligibility={eligibility}
        />
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(dob)).toBeInTheDocument();
    expect(screen.getByText(familyHistory)).toBeInTheDocument();
});
