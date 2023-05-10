import { render } from '@testing-library/react';
import PatientCardAdmin from '@/components/PatientCardAdmin';
import '@testing-library/jest-dom/extend-expect';

// test('renders patient card', () => {
//     render(<PatientCardAdmin />);
// });

test('renders patient information correctly', () => {
    const name = 'John Doe';
    const dob = '1990-01-01T00:00:00Z';
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
    expect(screen.getByText(dob.split('T')[0])).toBeInTheDocument();
    expect(screen.getByText(familyHistory)).toBeInTheDocument();
    // Assert the presence and correctness of the patient information in the rendered output
});