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
        <form onSubmit={handleSubmit}>
            <div className='uppertext'>Book local doctors who accept your Insurance</div>
            <div className="search-bar">
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control search-input"
                        value={name}
                        placeholder="Name"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control search-input"
                        value={specialty}
                        placeholder="Specialty"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSpecialty(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control search-input"
                        value={location}
                        placeholder="Location"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary search-btn">Search</button>
            </div>

            {/* <div className="search-bar">
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Location"
            name="location"
            value={searchParams.location}
            onChange={handleSearchChange}
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Specialty"
            name="specialty"
            value={searchParams.specialty}
            onChange={handleSearchChange}
            />
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Insurance"
            name="insurance"
            value={searchParams.insurance}
            onChange={handleSearchChange}
            />
            <button className="btn btn-primary search-btn">Search</button>
        </div> */}
        </form>
    );
};

export default SearchForm;
