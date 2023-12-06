import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../Css/SearchForm.css';

interface SearchFormProps {
    onSearchSubmit: (data: { name: string; specialty: string; location: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchSubmit }) => {
    const [name, setName] = useState<string>('');
    const [specialty, setSpecialty] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchSubmit({ name, specialty, location });
    };

    return (
        <form onSubmit={handleSubmit} className="form-inline d-flex">
            <div className="form-group mb-2">
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    placeholder="Name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <input
                    type="text"
                    className="form-control"
                    value={specialty}
                    placeholder="Specialty"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSpecialty(e.target.value)}
                />
            </div>
            <div className="form-group mb-2">
                <input
                    type="text"
                    className="form-control"
                    value={location}
                    placeholder="Location"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Search</button>
        </form>
    );
};

export default SearchForm;
